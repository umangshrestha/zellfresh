resource "aws_appsync_resolver" "resolver" {
  for_each = {
    "hello" = {
      type = "Query",
    }
  }
  api_id =      aws_appsync_graphql_api.appsync_api.id
  type           = each.value.type
  field          = each.key
  data_source = null
  code           = file("${local.resolvers_dir}/${each.value.type}.${each.key}.js")
  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }
}


module "appsync_dynamodb_resolver" {
  for_each = {
    "product" = {
      type            = "Query",
      table_name      = module.dynamodb.products_table.name,
      policy_document = data.aws_iam_policy_document.product_policy_document.json
    }
    "products" = {
      type            = "Query",
      table_name      = module.dynamodb.products_table.name,
      policy_document = data.aws_iam_policy_document.products_policy_document.json
    }
    "addProduct" = {
      type            = "Mutation",
      table_name      = module.dynamodb.products_table.name,
      policy_document = data.aws_iam_policy_document.add_product_policy_document.json
    }
  }
  appsync_api_id  = aws_appsync_graphql_api.appsync_api.id
  source          = "./appsync_dynamodb_resolver"
  type            = each.value.type
  field           = each.key
  code            = file("${local.resolvers_dir}/${each.value.type}.${each.key}.js")
  table_name      = each.value.table_name
  policy_document = each.value.policy_document
  aws_region      = var.aws_region
}
