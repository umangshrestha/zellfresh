resource "aws_dynamodb_table" "orders_table" {
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