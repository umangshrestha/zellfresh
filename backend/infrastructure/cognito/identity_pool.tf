resource "aws_cognito_identity_pool" "identity_pool" {
  identity_pool_name               = "ecommerce-identity-pool"
  allow_unauthenticated_identities = true
  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.cognito_user_pool_client.id
    provider_name           = aws_cognito_user_pool.cognito_user_pool.endpoint
    server_side_token_check = false
  }
}

resource "aws_cognito_identity_pool_roles_attachment" "identity_pool_roles" {
  identity_pool_id = aws_cognito_identity_pool.identity_pool.id
  roles = {
    "authenticated"   = module.iam_role["guest"].arn
    "unauthenticated" = module.iam_role["guest"].arn
  }

  role_mapping {
    identity_provider         = format("cognito-idp.%s.amazonaws.com/%s:%s", var.aws_region, aws_cognito_user_pool.cognito_user_pool.id, aws_cognito_user_pool.cognito_user_pool.id)
    ambiguous_role_resolution = "AuthenticatedRole"
    type                      = "Rules"

    mapping_rule {
      claim      = "isAdmin"
      match_type = "Equals"
      role_arn   = module.iam_role["admin"].arn
      value      = "true"
    }

    mapping_rule {
      claim      = "isAdmin"
      match_type = "Equals"
      role_arn   =  module.iam_role["user"].arn
      value      = "false"
    
  }
}
}
