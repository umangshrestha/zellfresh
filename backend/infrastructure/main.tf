module "dynamodb" {
  source = "./dynamodb"
}


module "cognito" {
  source = "./cognito"

  admin_policies = [
    data.aws_iam_policy_document.appsync_policy_document.json,
    data.aws_iam_policy_document.admin_policy.json,
  ]
  user_policies = [
    data.aws_iam_policy_document.appsync_policy_document.json,
    data.aws_iam_policy_document.user_policy.json,
  ]
  guest_policies = [
    data.aws_iam_policy_document.appsync_policy_document.json,
    data.aws_iam_policy_document.guest_policy.json,
  ]

  frontend_url = var.frontend_url
  aws_region   = var.aws_region
}

module "cloudwatch" {
  source = "./iam/cloudwatch_role"
}