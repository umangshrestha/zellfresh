data "aws_ecr_repository" "repositories" {
  name = "zell-fresh-nest-js"
}

data "aws_ecr_image" "image" {
  repository_name = data.aws_ecr_repository.repositories.name
  image_tag       = "latest"
}

