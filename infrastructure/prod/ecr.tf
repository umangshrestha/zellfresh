data "aws_ecr_image" "image" {
  repository_name = "zell-fresh-nest-js"
  image_tag       = "latest"
}

