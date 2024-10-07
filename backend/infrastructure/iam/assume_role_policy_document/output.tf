output "json" {
  value = data.aws_iam_policy_document.assume_role_policy_document.json
}