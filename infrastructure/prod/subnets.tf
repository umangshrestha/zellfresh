resource "aws_subnet" "public" {
  count                   = length(var.availability_zones)
  cidr_block              = cidrsubnet(var.vpc_cidr_block, 8, length(var.availability_zones) + count.index)
  availability_zone       = var.availability_zones[count.index]
  vpc_id                  = aws_vpc.default.id
  map_public_ip_on_launch = true

  tags = {
    Name        = "public | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  cidr_block        = cidrsubnet(var.vpc_cidr_block, 8, count.index)
  availability_zone = var.availability_zones[count.index]
  vpc_id            = aws_vpc.default.id

  tags = {
    Name        = "private | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }
}


resource "aws_route_table" "public" {
  vpc_id = aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.default.id
  }

  tags = {
    Name        = "public | route_table"
    Project     = var.project_name
    Environment = var.environment
  }
}


resource "aws_route_table" "private" {
  count  = !var.nat_gateway_enabled ? length(var.availability_zones) : 0
  vpc_id = aws_vpc.default.id

  route {
    cidr_block           = "0.0.0.0/0"
    nat_gateway_id       = var.nat_gateway_enabled ? aws_nat_gateway.nat_gateway[count.index].id : null
    network_interface_id = var.nat_gateway_enabled ? null : aws_instance.nat_instance[count.index].primary_network_interface_id
  }

  tags = {
    Name        = "private | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_route_table_association" "public" {
  count          = length(var.availability_zones)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = length(var.availability_zones)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

resource "aws_main_route_table_association" "public_main" {
  vpc_id         = aws_vpc.default.id
  route_table_id = aws_route_table.public.id
}


resource "aws_eip" "nat" {
  count  = length(var.availability_zones)
  domain = "vpc"

  tags = {
    Name        = "nat_gateway | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_eip_association" "nat" {
  count         = length(var.availability_zones)
  instance_id   = var.nat_gateway_enabled ? aws_nat_gateway.nat_gateway[count.index].private_ip : aws_instance.nat_instance[count.index].id
  allocation_id = aws_eip.nat[count.index].id
}

###### NAT Gateway ######
resource "aws_nat_gateway" "nat_gateway" {
  count         = var.nat_gateway_enabled ? length(var.availability_zones) : 0
  subnet_id     = aws_subnet.public[count.index].id
  allocation_id = aws_eip.nat[count.index].id

  tags = {
    Name        = "nat_gateway | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }
}
###### NAT Gateway ######



###### NAT Instance ######
resource "aws_key_pair" "terraform_key" {
  key_name   = "terraform"
  public_key = file("~/.ssh/aws.pub")

  tags = {
    Name        = "terraform_key"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_security_group" "nat_instance_security_group" {
  name        = "nat_sg"
  description = "Security group for NAT instance"
  vpc_id      = aws_vpc.default.id

  ingress {
    description = "Allow all inbound traffic from the VPC though SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow all inbound traffic from the VPC though HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow all inbound traffic from the VPC though HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic to the internet"
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "nat_sg"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_network_interface" "network_interface" {
  count             = !var.nat_gateway_enabled ? length(var.availability_zones) : 0
  subnet_id         = aws_subnet.public[count.index].id
  source_dest_check = false
  security_groups   = [aws_security_group.nat_instance_security_group.id]

  tags = {
    Name = "nat_instance | ${var.availability_zones[count.index]}"
  }
}

resource "aws_instance" "nat_instance" {
  count                       = !var.nat_gateway_enabled ? length(var.availability_zones) : 0
  ami                         = "ami-0614680123427b75e"
  instance_type               = "t3.micro"
  user_data_replace_on_change = true
  key_name                    = aws_key_pair.terraform_key.key_name
  iam_instance_profile        = aws_iam_instance_profile.nat_instance_profile.name

  network_interface {
    network_interface_id = aws_network_interface.network_interface[count.index].id
    device_index         = 0
  }
  tags = {
    Name        = "nat_instance | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }

  # https://docs.aws.amazon.com/vpc/latest/userguide/work-with-nat-instances.html#create-nat-ami
  user_data = <<-EOL
      #! /bin/bash
      sudo yum install iptables-services aws-cli -y
      sudo systemctl enable iptables
      sudo systemctl start iptables
      sudo sysctl -w net.ipv4.ip_forward=1
      sudo /sbin/iptables -t nat -A POSTROUTING -o ens5 -j MASQUERADE
      sudo /sbin/iptables -F FORWARD
      sudo service iptables save
    EOL
}
###### NAT Instance ######


resource "aws_instance" "nat_testing_aws_instances" {
  count           = var.create_nat_test_instance ? 1 : 0
  ami             = "ami-0614680123427b75e"
  instance_type   = "t2.micro"
  subnet_id       = aws_subnet.private[count.index].id
  key_name        = aws_key_pair.terraform_key.key_name
  security_groups = [aws_security_group.nat_instance_security_group.id]

  root_block_device {
    volume_size = "8"
    volume_type = "gp2"
    encrypted   = true
  }

  tags = {
    Name        = "test | nat_instance | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }
}