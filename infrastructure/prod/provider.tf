terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "zell-fresh.prod.ap-south-1.terraform-state"
    key            = "zell-fresh/terraform.tfstate"
    dynamodb_table = "terraform-locks"
    region         = "ap-south-1"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}
