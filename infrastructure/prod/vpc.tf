resource "aws_vpc" "default" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name        = "VPC | ${var.project_name}"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_internet_gateway" "default" {
  vpc_id = aws_vpc.default.id

  tags = {
    Name        = "IGW | ${var.project_name}"
    Project     = var.project_name
    Environment = var.environment
  }
}