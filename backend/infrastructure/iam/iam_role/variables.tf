variable "role_name" {
  type = string
}

variable "assume_role_policy" {
  type = string
  default = null
}

variable "policy_documents" {
  type = list(string)
  default = []
}
