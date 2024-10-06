resource "aws_appsync_graphql_api" "appsync_api" {
  name                = "ecommerce-appsync-api"
  authentication_type = "AWS_IAM"

  schema            = file(local.graphql_schema)
  query_depth_limit = 2

  xray_enabled = true
  log_config {
    field_log_level          = "ALL"
    cloudwatch_logs_role_arn = aws_iam_role.logging_role.arn
  }

  additional_authentication_provider {
    authentication_type = "AMAZON_COGNITO_USER_POOLS"
    user_pool_config {
      aws_region   = var.aws_region
      user_pool_id = module.cognito.user_pool_id
    }
  }

  additional_authentication_provider {
    authentication_type = "AWS_IAM"
  }
}

resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.appsync_api.id
}