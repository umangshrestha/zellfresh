resource "aws_cloudwatch_log_group" "log_group" {
  name              = "/ecs/${var.project_name}/${var.environment}"
  retention_in_days = var.retention_in_days

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}