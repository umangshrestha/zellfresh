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

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.default.id
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}


resource "aws_route_table_association" "public" {
  count          = length(var.availability_zones)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
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

###### NAT Gateway ######
#
# NAT Gateway is expensive, so I am replacing it with a NAT Instance
#
# resource "aws_nat_gateway" "nat_gateway" {
#   count         = length(var.availability_zones)
#   subnet_id     = aws_subnet.public[count.index].id
#   allocation_id = aws_eip.nat[count.index].id
#
#   tags = {
#     Name        = "nat_gateway | ${var.availability_zones[count.index]}"
#     Project     = var.project_name
#     Environment = var.environment
#   }
# }
# resource "aws_route_table" "private" {
#   count  = length(var.availability_zones)
#   vpc_id = aws_vpc.default.id
#
#   route {
#     cidr_block = "0.0.0.0/0"
#     nat_gateway_id = aws_nat_gateway.nat_gateway[count.index].id
#   }
#
#   tags = {
#     Name        = "private | ${var.availability_zones[count.index]}"
#     Project     = var.project_name
#     Environment = var.environment
#   }
# }
###### NAT Gateway ######



###### NAT Instance ######
resource "aws_key_pair" "terraform_key" {
  key_name   = "terraform"
  public_key = file("~/.ssh/id_rsa.pub")

  tags = {
    Name        = "terraform_key"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_instance" "nat_instance" {
  count                       = length(var.availability_zones)
  ami                         = "ami-0614680123427b75e"
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.public[count.index].id
  key_name                    = aws_key_pair.terraform_key.key_name
  iam_instance_profile        = aws_iam_instance_profile.nat_instance_profile.name
  security_groups             = [aws_security_group.nat_sg.id]
  associate_public_ip_address = true
  source_dest_check           = false

  tags = {
    Name        = "nat_instance | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }

  user_data = <<-EOF
              #!/bin/bash
              yum install -y aws-cli
              echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf
              sysctl -p
              iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
              EOF
}


resource "aws_security_group" "nat_sg" {
  name        = "nat_sg"
  description = "Security group for NAT instance"
  vpc_id      = aws_vpc.default.id

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
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

resource "aws_eip_association" "nat_instance" {
  count         = length(var.availability_zones)
  instance_id   = aws_instance.nat_instance[count.index].id
  allocation_id = aws_eip.nat[count.index].id
}

resource "aws_route_table" "private" {
  count  = length(var.availability_zones)
  vpc_id = aws_vpc.default.id

  route {
    cidr_block           = "0.0.0.0/0"
    network_interface_id = aws_instance.nat_instance[count.index].primary_network_interface_id
  }

  tags = {
    Name        = "private | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }

  depends_on = [aws_instance.nat_instance]
}
###### NAT Instance ######

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


resource "aws_route_table_association" "private" {
  count          = length(var.availability_zones)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}