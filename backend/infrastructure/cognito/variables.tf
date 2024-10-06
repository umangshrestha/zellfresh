variable "arns" {
    type = object({
        products_table = string
        orders_table   = string
        appsync_api    = string
    })
}

variable "frontend_url" {
  type        = string
}

variable "aws_region" {
  type    = string
}