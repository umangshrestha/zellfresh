resource "aws_dynamodb_table" "products_table" {
  name         = "PRODUCT_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "order_table" {
  name         = "CART_TABLE"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"
  range_key    = "id"

  attribute {
    name = "user_id"
    type = "S"
  }
  attribute {
    name = "id"
    type = "S"
  }
}
