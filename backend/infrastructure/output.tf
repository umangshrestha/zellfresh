output "appsync_url" {
  value = aws_appsync_graphql_api.appsync_api.uris["GRAPHQL"]
}

output "appsync_api_id" {
  value = aws_appsync_graphql_api.appsync_api.id
}

output "user_pool_id" {
  value = module.cognito.user_pool_id
}

output "user_pool_client_id" {
  value = module.cognito.user_pool_client_id
}