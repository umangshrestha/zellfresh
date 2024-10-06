data "aws_iam_policy_document" "policy_document" {
  statement {
    effect = "Allow"
    principals {
      type        = "Federated"
      identifiers = ["cognito-identity.amazonaws.com"]
    }
    actions = ["sts:AssumeRoleWithWebIdentity"]
    condition {
      test     = "StringEquals"
      variable = "cognito-identity.amazonaws.com:aud"
      values   = [var.identity_pool_id]
    }

    condition {
      test     = "StringLike"
      variable = "cognito-identity.amazonaws.com:amr"
      values   = [var.state]
    }
  }
}