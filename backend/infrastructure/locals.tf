locals {
  graphql_dir    = "../graphql"
  graphql_schema = "${local.graphql_dir}/schema.graphql"
  resolvers_dir  = "${local.graphql_dir}/js-resolvers"
}