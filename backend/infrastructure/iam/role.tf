resource "aws_iam_role" "appsync_dynamo_role" {
  name               = "AppSyncDynamoDBRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy" "appsync_dynamodb_policy" {
  name   = "AppSyncDynamoDBPolicy"
  role   = aws_iam_role.appsync_dynamo_role.id
  policy = data.aws_iam_policy_document.dynamodb_read_write_document.json
}

resource "aws_iam_role" "appsync_logging_role" {
  name               = "appsync_logging_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"
  ]
}
