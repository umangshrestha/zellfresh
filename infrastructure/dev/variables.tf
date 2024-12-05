variable "project_name" {
  type    = string
  default = "zell-fresh"
}

variable "env" {
  type    = string
  default = "dev"
  validation {
    condition     = contains(["dev", "prod"], var.env)
    error_message = "env must be either dev or prod"
  }
}

variable "aws_region" {
  type    = string
  default = "ap-south-1"
}