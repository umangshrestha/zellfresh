terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}


module "iam" {
  source = "./iam"
  dynabodb_table_arns = [
    aws_dynamodb_table.products_table.arn,
    aws_dynamodb_table.order_table.arn
  ]
}
