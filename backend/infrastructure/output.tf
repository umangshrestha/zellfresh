output "appsync_url" {
  value = aws_appsync_graphql_api.appsync_api.uris["GRAPHQL"]
}

output "appsync_api_id" {
  value = aws_appsync_graphql_api.appsync_api.id
}
