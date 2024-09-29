resource "aws_appsync_graphql_api" "ecommerce_appsync_api" {
  name                = "ecommerce-appsync-api"
  authentication_type = "API_KEY"
  schema              = file("../graphql/schema.graphql")


  log_config {
    field_log_level = "ALL" 
    cloudwatch_logs_role_arn = aws_iam_role.appsync_cloudwatch_role.arn
  }
}

resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.ecommerce_appsync_api.id
}

resource "aws_appsync_datasource" "null" {
  api_id = aws_appsync_graphql_api.ecommerce_appsync_api.id
  name   = "None"
  type   = "NONE"
}

resource "aws_appsync_datasource" "dynamodb" {
  api_id           = aws_appsync_graphql_api.ecommerce_appsync_api.id
  name             = "DynamoDB"
  type             = "AMAZON_DYNAMODB"
  service_role_arn = aws_iam_role.appsync_dynamo_role.arn

  dynamodb_config {
    table_name = aws_dynamodb_table.products_table.name
    region     = var.aws_region
  }
}

resource "aws_appsync_resolver" "query" {
  for_each = {
    "hello" : { type = "Query", data_source = aws_appsync_datasource.null.name },
    "products" : { type = "Query", data_source = aws_appsync_datasource.dynamodb.name },
    "product" : { type = "Query", data_source = aws_appsync_datasource.dynamodb.name },
    "putProduct" : { type = "Mutation", data_source = aws_appsync_datasource.dynamodb.name },
  }

  api_id            = aws_appsync_graphql_api.ecommerce_appsync_api.id
  type              = each.value.type
  field             = each.key
  data_source       = each.value.data_source

  runtime {
    name  = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }
  code = file("../graphql/js-resolvers/${each.key}.js")
}
