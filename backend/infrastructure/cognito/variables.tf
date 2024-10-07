variable "frontend_url" {
  type        = string
}

variable "aws_region" {
  type    = string
}

variable "admin_policies" {
  type    = list(string)
}

variable "user_policies" {
  type    = list(string)
}

variable "guest_policies" {
  type    = list(string)
}