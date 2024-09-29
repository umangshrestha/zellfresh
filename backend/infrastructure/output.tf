output "appsync_url" {
  value = aws_appsync_graphql_api.ecommerce_appsync_api.uris["GRAPHQL"]
}

output "appsync_api_id" {
  value = aws_appsync_graphql_api.ecommerce_appsync_api.id
}

output "log_group_name" {
  value = aws_cloudwatch_log_group.appsync_logs_group.name
}