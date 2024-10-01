output "appsync_logs_role_arn" {
  value = aws_iam_role.appsync_logging_role.arn
  description = "The ARN of the CloudWatch log group for AppSync logs."
}


output "dynanmo_read_write_role_arn" {
  value = aws_iam_role.appsync_dynamo_role.arn
  description = "The ARN of the IAM role for AppSync to access DynamoDB."
}