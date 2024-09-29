resource "aws_iam_role" "appsync_dynamo_role" {
  name               = "AppSyncDynamoDBRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type = "Service"
      identifiers = [
        "appsync.amazonaws.com"
      ]
    }

    actions = [
      "sts:AssumeRole"
    ]
  }
}

data "aws_iam_policy_document" "dynamodb_read_write_document" {
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:ConditionCheckItem",
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:GetRecords",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:UpdateItem",
    ]

    resources = [
      aws_dynamodb_table.products_table.arn,
      aws_dynamodb_table.order_table.arn
    ]
  }
}



resource "aws_iam_role_policy" "appsync_dynamodb_policy" {
  name   = "AppSyncDynamoDBPolicy"
  role   = aws_iam_role.appsync_dynamo_role.id
  policy = data.aws_iam_policy_document.dynamodb_read_write_document.json
}