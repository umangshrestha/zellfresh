module "assume_role_policy_document" {
  source = "../assume_role_policy_document"
}
resource "aws_iam_role" "logging_role" {
  assume_role_policy = module.assume_role_policy_document.json
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"
  ]
}
