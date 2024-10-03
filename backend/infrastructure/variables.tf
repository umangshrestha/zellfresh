variable "aws_region" {
  type        = string
  description = "AWS Region"
  default     = "us-east-1"
}

variable "google_client_id" {
  type        = string
  sensitive   = true
  description = "Google Client ID"
}


variable "frontend_url" {
  type        = string
  description = "Path to the frontend code"
  default     = "http://localhost:5173"
}


variable "environment" {
  type        = string
  description = "Environment"
  default     = "dev"
}