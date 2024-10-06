module "dynamodb" {
  source = "./dynamodb"
}


module "cognito" {
  source = "./cognito"
  arns = {
    products_table = module.dynamodb.products_table.arn
    orders_table   = module.dynamodb.orders_table.arn
    appsync_api    = aws_appsync_graphql_api.appsync_api.arn
  }
  frontend_url = var.frontend_url
  aws_region   = var.aws_region
}