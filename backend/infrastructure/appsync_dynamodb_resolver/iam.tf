module "assume_role_policy_document" {
  source = "../iam/assume_role_policy_document"
}


resource "aws_iam_role" "role" {
 name = local.iam_role_name
  assume_role_policy = module.assume_role_policy_document.json
}

resource "aws_iam_role_policy" "policy" {
  role   = aws_iam_role.role.id
  policy = var.policy_document
}