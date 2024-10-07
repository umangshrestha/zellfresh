module "iam_role" {
  for_each = {
    admin ={
      policy_documents = var.admin_policies
      state = "authenticated"
    },
    user = {
      policy_documents = var.user_policies
      state = "authenticated"
    },
    guest = {
      policy_documents = var.guest_policies
      state = "authenticated"
    }
  }
  source = "../iam/iam_role"
  role_name = each.key
  policy_documents = each.value.policy_documents
  assume_role_policy = data.aws_iam_policy_document.policy_document[each.value.state].json
}
