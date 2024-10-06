resource "aws_appsync_datasource" "products_datasource" {
  name   = local.datasource_name
  api_id = var.appsync_api_id
  type   = "AMAZON_DYNAMODB"
  dynamodb_config {
    table_name = var.table_name
    region     = var.aws_region
  }
}

