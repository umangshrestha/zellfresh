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

resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id            = aws_vpc.default.id
  service_name      = "com.amazonaws.${var.aws_region}.dynamodb"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = aws_route_table.private.*.id

  tags = {
    Name        = "dynamodb-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.default.id
  service_name      = "com.amazonaws.${var.aws_region}.s3"
  vpc_endpoint_type = "Gateway"

  route_table_ids = aws_route_table.private.*.id

  tags = {
    Name        = "s3-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id              = aws_vpc.default.id
  service_name        = "com.amazonaws.${var.aws_region}.ecr.api"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private.*.id
  security_group_ids  = [aws_security_group.nat_instance_security_group.id]

  tags = {
    Name        = "ecr-api-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id              = aws_vpc.default.id
  service_name        = "com.amazonaws.${var.aws_region}.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private.*.id
  security_group_ids  = [aws_security_group.nat_instance_security_group.id]

  tags = {
    Name        = "ecr-dkr-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}


resource "aws_vpc_endpoint" "cloudwatch_logs" {
  vpc_id              = aws_vpc.default.id
  service_name        = "com.amazonaws.${var.aws_region}.logs"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private.*.id
  security_group_ids  = [aws_security_group.nat_instance_security_group.id]

  tags = {
    Name        = "cloudwatch-logs-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc_endpoint" "ssm" {
  vpc_id              = aws_vpc.default.id
  service_name        = "com.amazonaws.${var.aws_region}.ssm"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private.*.id
  security_group_ids  = [aws_security_group.nat_instance_security_group.id]

  tags = {
    Name        = "ssm-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc_endpoint" "ssm_messages" {
  vpc_id              = aws_vpc.default.id
  service_name        = "com.amazonaws.${var.aws_region}.ssmmessages"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private.*.id
  security_group_ids  = [aws_security_group.nat_instance_security_group.id]

  tags = {
    Name        = "ssm-messages-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc_endpoint" "secrets_manager" {
  vpc_id              = aws_vpc.default.id
  service_name        = "com.amazonaws.${var.aws_region}.secretsmanager"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true
  subnet_ids          = aws_subnet.private.*.id
  security_group_ids  = [aws_security_group.nat_instance_security_group.id]

  tags = {
    Name        = "secrets-manager-endpoint"
    Project     = var.project_name
    Environment = var.environment
  }
}