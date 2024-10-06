resource "aws_iam_role" "logging_role" {
  assume_role_policy = data.aws_iam_policy_document.assume_role_document.json
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"
  ]
}
