resource "aws_iam_role" "role" {
  name              = var.role_name
  assume_role_policy = data.aws_iam_policy_document.policy_document.json
}

resource "aws_iam_role_policy" "policy" {
  role   = aws_iam_role.role.id
  policy = var.policy_document
}
