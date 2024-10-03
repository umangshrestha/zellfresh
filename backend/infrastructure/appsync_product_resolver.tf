data "aws_iam_policy_document" "product_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
    ]
    resources = [
      aws_dynamodb_table.products_table.arn,
    ]
  }
}

resource "aws_iam_role" "product_role" {
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy" "product_query_policy" {
  role   = aws_iam_role.product_role.id
  policy = data.aws_iam_policy_document.product_policy_document.json
}

resource "aws_appsync_datasource" "product_datasource" {
  name   = "ProductDatasource"
  api_id = aws_appsync_graphql_api.appsync_api.id
  type   = "AMAZON_DYNAMODB"
  dynamodb_config {
    table_name = aws_dynamodb_table.products_table.name
    region     = var.aws_region
  }
}

resource "aws_appsync_resolver" "product_query" {
  api_id      = aws_appsync_graphql_api.appsync_api.id
  type        = "Query"
  field       = "product"
  data_source = aws_appsync_datasource.product_datasource.name
  runtime {
    name            = "APPSYNC_JS"
    runtime_version = "1.0.0"
  }
  code = file("${local.resolvers_dir}/product.js")
}

