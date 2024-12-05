resource "aws_s3_bucket" "terraform_state" {
  bucket = "${var.project_name}.${var.env}.terraform-state"

  tags = {
    Project     = var.project_name
    Environment = var.env
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state_access_block" {
  bucket = aws_s3_bucket.terraform_state.bucket

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}