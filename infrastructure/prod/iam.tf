# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "${var.project_name}-ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.task_assume_role_policy.json

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "task_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# ECS Task IAM Role
resource "aws_iam_role" "ecs_task_iam_role" {
  name               = "${var.project_name}-iam-role"
  assume_role_policy = data.aws_iam_policy_document.task_assume_role_policy.json

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}



data "aws_iam_policy_document" "dynamodb" {
  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:BatchGetItem",
      "dynamodb:TransactWriteItems",
      "dynamodb:ConditionCheckItem",
      "dynamodb:DescribeTable"
    ]

    resources = [
      aws_dynamodb_table.products_table.arn,
      aws_dynamodb_table.address_table.arn,
      aws_dynamodb_table.carts_table.arn,
      aws_dynamodb_table.orders_table.arn,
      aws_dynamodb_table.reviews_table.arn,
      aws_dynamodb_table.users_table.arn
    ]
  }
}

resource "aws_iam_policy" "dynamodb_policy" {
  name        = "${var.project_name}-dynamodb-policy"
  description = "Allow ECS task to interact with DynamoDB"
  policy      = data.aws_iam_policy_document.dynamodb.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_dynamodb_policy" {
  role       = aws_iam_role.ecs_task_iam_role.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}

# Nat Gateway IAM Role
resource "aws_iam_role" "nat_instance_role" {
  name               = "${var.project_name}-nat-instance-role"
  assume_role_policy = data.aws_iam_policy_document.nat_assume_role_policy.json

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

data "aws_iam_policy_document" "nat_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_instance_profile" "nat_instance_profile" {
  name = "${var.project_name}-nat-instance-profile"
  role = aws_iam_role.nat_instance_role.name

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

data "aws_iam_policy_document" "nat_instance_policy" {
  statement {
    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetAuthorizationToken",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_policy" "nat_instance_policy" {
  name        = "${var.project_name}-nat-instance-policy"
  description = "Allow NAT instance to interact with ECR"
  policy      = data.aws_iam_policy_document.nat_instance_policy.json
}

resource "aws_iam_role_policy_attachment" "nat_instance_policy" {
  role       = aws_iam_role.nat_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}


resource "aws_iam_role_policy_attachment" "nat_instance_power_user_policy" {
  role       = aws_iam_role.nat_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}