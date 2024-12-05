output "container_set" {
  value = data.aws_ecr_image.image.image_uri
}

output "alb_url" {
  value = "http://${aws_alb.alb.dns_name}"
}