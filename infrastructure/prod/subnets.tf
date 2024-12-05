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


resource "aws_eip" "nat_gateway" {
  count  = length(var.availability_zones)
  domain = "vpc"

  tags = {
    Name        = "nat_gateway | ${var.availability_zones[count.index]}"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_nat_gateway" "nat_gateway" {
  count         = length(var.availability_zones)
  subnet_id     = aws_subnet.public[count.index].id
  allocation_id = aws_eip.nat_gateway[count.index].id

  tags = {
    Name        = "nat_gateway | ${var.availability_zones[count.index]}"
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


resource "aws_route_table" "private" {
  count  = length(var.availability_zones)
  vpc_id = aws_vpc.default.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway[count.index].id
  }

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