locals {
  graphql_dir    = "../graphql"
  graphql_schema = "${local.graphql_dir}/schema.graphql"
  resolvers_dir  = "${local.graphql_dir}/js-resolvers"
  queries_dir    = "${local.resolvers_dir}/queries"
  mutations_dir  = "${local.resolvers_dir}/mutations"
}