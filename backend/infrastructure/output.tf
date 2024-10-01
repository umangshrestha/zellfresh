output "appsync_url" {
  value = aws_appsync_graphql_api.ecommerce_appsync_api.uris["GRAPHQL"]
}

output "appsync_api_id" {
  value = aws_appsync_graphql_api.ecommerce_appsync_api.id
}
