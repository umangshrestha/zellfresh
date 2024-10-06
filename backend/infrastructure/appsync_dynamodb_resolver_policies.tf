data "aws_iam_policy_document" "products_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:Scan",
    ]
    resources = [
      module.dynamodb.products_table.arn,
    ]
  }
}

data "aws_iam_policy_document" "product_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
    ]
    resources = [
      module.dynamodb.products_table.arn,
    ]
  }
}

data "aws_iam_policy_document" "add_product_policy_document" {
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:PutItem",
    ]
    resources = [
      module.dynamodb.products_table.arn,
    ]
  }
}