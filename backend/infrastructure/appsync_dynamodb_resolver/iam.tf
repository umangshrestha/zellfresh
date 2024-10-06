resource "aws_iam_role" "role" {
 name = local.iam_role_name
  assume_role_policy = data.aws_iam_policy_document.assume_role_document.json
}

resource "aws_iam_role_policy" "policy" {
  role   = aws_iam_role.role.id
  policy = var.policy_document
}