resource "aws_appsync_resolver" "hello_query" {
  api_id      = aws_appsync_graphql_api.appsync_api.id
  type        = "Query"
  field       = "hello"
  data_source = null
  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }
  code = file("${local.resolvers_dir}/hello.js")
}


