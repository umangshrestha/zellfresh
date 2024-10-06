variable "aws_region" {
  type    = string
}

variable "table_name" {
  type    = string
}

variable "appsync_api_id" {
  type    = string
}

variable "policy_document" {
  type    = string
}

variable "type" {
  type    = string
  validation {
    condition     = var.type == "Query" || var.type == "Mutation" || var.type == "Subscription"
    error_message = "Query must not be either \"Query\", \"Mutation\" or \"Subscription\""
  }
}

variable "field" {
  type    = string
}

variable "code" {
  type    = string
}