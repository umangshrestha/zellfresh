data "aws_iam_policy_document" "policy_document" {
 for_each = toset([
   "authenticated",
   "unauthenticated"
   ])
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
      values   = [aws_cognito_identity_pool.identity_pool.id]
    }

    condition {
      test     = "StringLike"
      variable = "cognito-identity.amazonaws.com:amr"
      values   = [each.key]
    }
  }
}