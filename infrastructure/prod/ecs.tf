resource "aws_ecs_cluster" "cluster" {
  name = "${var.project_name}-cluster-01"
}


resource "aws_ecs_service" "ecs_app_service" {
  name            = "${var.project_name}-service"
  launch_type     = "FARGATE"
  cluster         = aws_ecs_cluster.cluster.arn
  desired_count   = var.desired_count
  task_definition = aws_ecs_task_definition.zell_fresh_task_definition.arn

  network_configuration {
    security_groups  = [aws_security_group.ecs_container_instance.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.service_target_group.arn
    container_name   = var.project_name
    container_port   = var.container_port
  }
}


locals {
  secrets = jsondecode(data.aws_secretsmanager_secret_version.secret_version.secret_string)
  environment_variables = concat([
    for key, value in local.secrets : {
      name  = key
      value = value
    }
    ], [
    {
      name  = "PORT",
      value = tostring(var.container_port)
      }, {
      name  = "NO_COLOR"
      value = "true"
    }
  ])
}

resource "aws_ecs_task_definition" "zell_fresh_task_definition" {
  family                   = "${var.project_name}_task_definition"
  cpu                      = var.cpu
  memory                   = var.memory
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_iam_role.arn
  container_definitions = jsonencode([
    {
      name      = var.project_name
      image     = data.aws_ecr_image.image.image_uri
      essential = true
      cpu       = var.cpu
      memory    = var.memory
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ],
      environment = local.environment_variables

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.log_group.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = {
    Name        = "${var.project_name}-task-definition"
    Project     = var.project_name
    Environment = var.environment
  }
}