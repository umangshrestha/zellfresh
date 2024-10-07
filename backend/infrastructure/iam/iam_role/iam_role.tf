resource "aws_iam_role" "role" {
  name              = var.role_name
  assume_role_policy = var.assume_role_policy
}


data "aws_iam_policy_document" "combined" {
    source_policy_documents = var.policy_documents
}

resource "aws_iam_role_policy" "policy" {
  role   = aws_iam_role.role.id
  policy = data.aws_iam_policy_document.combined.json
}