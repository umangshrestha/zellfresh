resource "aws_cognito_user_pool" "cognito_user_pool" {
  name                     = "ecommerce-user-pool"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }
  admin_create_user_config {
    allow_admin_create_user_only = false
  }


  schema {
    attribute_data_type      = "String"
    name                     = "email"
    required                 = true
    developer_only_attribute = false
    mutable                  = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Account Confirmation"
    email_message        = "Your confirmation code is {####}"
  }
}


resource "aws_cognito_user_pool_client" "cognito_user_pool_client" {
  name                          = "ecommerce-user-pool-client"
  user_pool_id                  = aws_cognito_user_pool.cognito_user_pool.id
  generate_secret               = true
  allowed_oauth_flows           = ["code"]
  prevent_user_existence_errors = "ENABLED"
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  allowed_oauth_flows_user_pool_client = true
  callback_urls                        = [var.frontend_url]
  logout_urls                          = [var.frontend_url]
  supported_identity_providers         = ["COGNITO"]
}

resource "aws_cognito_user_pool_domain" "cognito_user_pool_domain" {
  domain       = "ecommerce-user-pool-domain"
  user_pool_id = aws_cognito_user_pool.cognito_user_pool.id
}
