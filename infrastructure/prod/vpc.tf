resource "aws_vpc" "default" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_internet_gateway" "default" {
  vpc_id = aws_vpc.default.id

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}


resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id            = aws_vpc.default.id
  service_name      = "com.amazonaws.${var.aws_region}.dynamodb"
  vpc_endpoint_type = "Gateway"

  route_table_ids = aws_route_table.private.*.id

  tags = {
    Name        = "dynamodb-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}
