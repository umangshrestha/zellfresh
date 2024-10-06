data "aws_iam_policy_document" "assume_role_document" {
  statement {
    effect = "Allow"

    principals {
      type = "Service"
      identifiers = [
        "appsync.amazonaws.com"
      ]
    }
    actions = [
      "sts:AssumeRole"
    ]
  }
}
