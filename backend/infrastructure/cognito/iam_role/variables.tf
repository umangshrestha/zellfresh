variable "role_name" {
  type = string
}


variable "identity_pool_id" {
  type = string
}

variable "state" {
  type = string
  validation {
    condition     = var.state == "authenticated" || var.state == "unauthenticated"
    error_message = "State must be either \"authenticated\" or \"authenticated\""
  }
}


variable "policy_document" {
  type = string
}
 