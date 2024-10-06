variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "frontend_url" {
  type        = string
  description = "URL of the frontend"
  default     = "http://localhost:5173"
}

variable "environment" {
  type        = string
  description = "Environment"
  default     = "dev"
  validation {
    condition     = var.environment == "dev" || var.environment == "prod"
    error_message = "Environment must be either dev or prod"
  }
}

