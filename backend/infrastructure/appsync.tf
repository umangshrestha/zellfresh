resource "aws_appsync_graphql_api" "ecommerce_appsync_api" {
  name                = "ecommerce-appsync-api"
  authentication_type = "OPENID_CONNECT"
  schema              = file("../graphql/schema.graphql")
  query_depth_limit   = 2

  openid_connect_config {
    issuer    = "https://accounts.google.com"
    client_id = var.google_client_id
    iat_ttl   = 60
    auth_ttl  = 60
  }

  additional_authentication_provider {
    authentication_type = "API_KEY"
  }

  xray_enabled = true
  log_config {
    field_log_level          = "ALL"
    cloudwatch_logs_role_arn = module.iam.appsync_logs_role_arn
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
  service_role_arn = module.iam.dynanmo_read_write_role_arn

  dynamodb_config {
    table_name = aws_dynamodb_table.products_table.name
    region     = var.aws_region
  }
}

resource "aws_appsync_resolver" "query" {
  for_each = {
    "hello" : aws_appsync_datasource.null.name,
    "products" : aws_appsync_datasource.dynamodb.name,
    "product" : aws_appsync_datasource.dynamodb.name,
    "putProduct" : aws_appsync_datasource.dynamodb.name,
  }

  api_id      = aws_appsync_graphql_api.ecommerce_appsync_api.id
  type        = "Query"
  field       = each.key
  data_source = each.value

  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }
  code = file("../graphql/js-resolvers/${each.key}.js")
}


resource "aws_appsync_resolver" "muration" {
  for_each = {
    "putProduct" : aws_appsync_datasource.dynamodb.name,
  }

  api_id      = aws_appsync_graphql_api.ecommerce_appsync_api.id
  type        = "Mutation"
  field       = each.key
  data_source = each.value

  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }
  code = file("../graphql/js-resolvers/${each.key}.js")
}

