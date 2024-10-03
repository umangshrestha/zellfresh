resource "aws_appsync_graphql_api" "appsync_api" {
  name                = "ecommerce-appsync-api"
  authentication_type = "OPENID_CONNECT"
  schema              = file(local.graphql_schema)
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
    cloudwatch_logs_role_arn = aws_iam_role.logging_role.arn
  }
}

resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.appsync_api.id
}


