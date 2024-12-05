resource "aws_dynamodb_table" "products_table" {
  name         = "PRODUCTS_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "productId"

  attribute {
    name = "productId"
    type = "S"
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "users_table" {
  name         = "USERS_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"

  attribute {
    name = "userId"
    type = "S"
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "address_table" {
  name         = "ADDRESS_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "addressId"

  attribute {
    name = "userId"
    type = "S"
  }
  attribute {
    name = "addressId"
    type = "S"
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}


resource "aws_dynamodb_table" "carts_table" {
  name         = "CARTS_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"

  attribute {
    name = "userId"
    type = "S"
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
}

resource "aws_dynamodb_table" "orders_table" {
  name         = "ORDERS_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "orderId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "orderId"
    type = "S"
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "reviews_table" {
  name         = "REVIEWS_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "productId"
  range_key    = "userId"

  attribute {
    name = "productId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}