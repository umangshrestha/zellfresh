resource "aws_alb" "alb" {
  name            = "${var.project_name}-ALB-${var.environment}"
  security_groups = [aws_security_group.alb.id]
  subnets         = aws_subnet.public.*.id

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_alb_target_group" "service_target_group" {
  name                 = "${var.project_name}-TargetGroup-${var.environment}"
  port                 = var.container_port
  protocol             = "HTTP"
  vpc_id               = aws_vpc.default.id
  deregistration_delay = 5
  target_type          = "ip"

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }

  health_check {
    path                = "/api/health"
    protocol            = "HTTP"
    port                = "traffic-port"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  depends_on = [aws_alb.alb]
}

resource "aws_acm_certificate" "alb_certificate" {
  domain_name       = "www.${var.domain_name}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_alb_listener" "alb_default_listener" {
  load_balancer_arn = aws_alb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.service_target_group.arn
  }
}
