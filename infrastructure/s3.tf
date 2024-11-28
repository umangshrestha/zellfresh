resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-state-for-zell-fresh"
  tags = {
    Project = local.project_name
  }
}