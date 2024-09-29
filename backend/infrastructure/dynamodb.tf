resource "aws_dynamodb_table" "products_table" {
  name         = "PRODUCT_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

