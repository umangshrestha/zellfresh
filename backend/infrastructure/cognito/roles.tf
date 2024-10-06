

data "aws_iam_policy_document" "admin_policy" {
  statement {
    actions   = ["appsync:GraphQL"]
    resources = [var.arns.appsync_api]
    effect    = "Allow"
  }

  statement {
    actions = ["dynamodb:*"]
    resources = [
      var.arns.products_table,
    ]
    effect = "Allow"
  }
}


data "aws_iam_policy_document" "user_policy" {
  statement {
    actions   = ["appsync:GraphQL"]
    resources = [var.arns.appsync_api]
    effect    = "Allow"
  }

  statement {
    actions = ["dynamodb:GetItem", "dynamodb:Scan"]
    resources = [
      var.arns.products_table,
    ]
    effect = "Allow"
  }
}


data "aws_iam_policy_document" "guest_policy" {
  statement {
    actions   = ["appsync:GraphQL"]
    resources = [var.arns.appsync_api]
    effect    = "Allow"
  }

  statement {
    actions = ["dynamodb:GetItem", "dynamodb:Scan"]
    resources = [
      var.arns.products_table,
    ]
    effect = "Allow"
  }
}


module "iam_role" {
  for_each = {
    admin ={
      policy_document = data.aws_iam_policy_document.admin_policy.json
      state = "authenticated"
    },
    user = {
      policy_document = data.aws_iam_policy_document.user_policy.json
      state = "authenticated"
    },
    guest = {
      policy_document = data.aws_iam_policy_document.guest_policy.json
      state = "authenticated"
    }
  }
  source = "./iam_role"
  role_name = each.key
  policy_document = each.value.policy_document
  identity_pool_id = aws_cognito_identity_pool.identity_pool.id
  state = each.value.state
}
