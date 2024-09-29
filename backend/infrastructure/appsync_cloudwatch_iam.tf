# IAM Role for AppSync to write CloudWatch Logs
resource "aws_iam_role" "appsync_cloudwatch_role" {
  name = "AppSyncCloudWatchRole"

  assume_role_policy = data.aws_iam_policy_document.cloudwatch_assume_role.json
}

# Assume role policy for CloudWatch Logs
data "aws_iam_policy_document" "cloudwatch_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["appsync.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

# Policy for CloudWatch Logs permissions
data "aws_iam_policy_document" "cloudwatch_logs_policy_document" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogStreams"
    ]

    resources = [ aws_cloudwatch_log_group.appsync_logs_group.arn ]
  }
}

# Attach CloudWatch Logs permissions to the role
resource "aws_iam_role_policy" "appsync_cloudwatch_policy" {
  name   = "AppSyncCloudWatchPolicy"
  role   = aws_iam_role.appsync_cloudwatch_role.id
  policy = data.aws_iam_policy_document.cloudwatch_logs_policy_document.json
}