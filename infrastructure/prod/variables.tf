variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "zell-fresh"
}

variable "environment" {
  type    = string
  default = "prod"
  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "env must be either dev or prod"
  }
}


variable "domain_name" {
  description = "The domain name for the certificate"
  type        = string
  default     = "zellfresh.com"
}

############################################
# AWS
############################################
variable "aws_region" {
  type    = string
  default = "ap-south-1"
}

############################################
# Cloudwatch
############################################
variable "retention_in_days" {
  description = "Retention period for Cloudwatch logs"
  default     = 7
  type        = number
}

############################################
# ECS
############################################
variable "container_port" {
  description = "The port the container listens to"
  default     = 80
  type        = number
}

variable "cpu" {
  description = "Amount of CPU units for a single task"
  default     = 256
  type        = number
}

variable "memory" {
  description = "Amount of memory (in MB) for a single task"
  default     = 512
  type        = number
}

variable "desired_count" {
  description = "Number of tasks to run"
  default     = 1
  type        = number
}

############################################
# Vpc
############################################
variable "vpc_cidr_block" {
  description = "CIDR block for the VPC network"
  default     = "10.0.0.0/16"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones to use"
  default     = ["ap-south-1a", "ap-south-1c"]
  type        = list(string)
}