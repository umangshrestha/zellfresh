data "aws_iam_policy_document" "appsync_policy_document" {
  statement {
    actions   = ["appsync:GraphQL"]
    resources = [aws_appsync_graphql_api.appsync_api.arn]
    effect    = "Allow"
  }
}

data "aws_iam_policy_document" "admin_policy" {
  statement {
    actions = ["dynamodb:*"]
    resources = [
      module.dynamodb.products_table.arn,
    ]
    effect = "Allow"
  }
}


data "aws_iam_policy_document" "user_policy" {
  statement {
    actions = ["dynamodb:GetItem", "dynamodb:Scan"]
    resources = [
      module.dynamodb.products_table.arn,
    ]
    effect = "Allow"
  }
}


data "aws_iam_policy_document" "guest_policy" {
  statement {
    actions = ["dynamodb:GetItem", "dynamodb:Scan"]
    resources = [
      module.dynamodb.products_table.arn,
    ]
    effect = "Allow"
  }
}
