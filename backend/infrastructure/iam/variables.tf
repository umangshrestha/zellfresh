variable "dynabodb_table_arns" {
  type       = list(string)
  description = "The ARNs of the DynamoDB tables that AppSync will access."
}