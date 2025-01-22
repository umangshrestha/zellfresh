# Overview

| Technologies Used    | Description                                            |
| -------------------- | ------------------------------------------------------ |
| Programming Language | TypeScript                                             |
| Runtime              | Node.js ~v20                                           |
| Sqlite               | For caching products                                   |
| React                | For frontend                                           |
| Contentful           | For managing content                                   |
| Nestjs               | For fullstack backend                                  |
| HashiCorp Terraform  | Infrastructure as code tool for managing AWS resources |
| Localstack           | Mocking AWS resources for local development            |
| Docker               | For containerization                                   |
| AWS Secrets Manager  | For managing secrets                                   |
| AWS ECR              | For storing docker images                              |
| AWS ECS              | For running docker containers                          |
| AWS DynamoDB         | For storing user data                                  |
| AWS S3               | For terraform state management                         |

---

## Running AWS setup locally using Localstack

- Download localstack wrapper for

| Tools     | Localstack Wrapper                                         | Script                        | Reference                                                                            |
| --------- | ---------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| Terraform | [tflocal](https://github.com/localstack/terraform-local)   | `pip install terraform-local` | [Localstack Guide](https://docs.localstack.cloud/user-guide/integrations/terraform/) |
| Aws Cli   | [awscli-local](https://github.com/localstack/awscli-local) | `pip install awscli-local`    | [Localstack Guide](https://docs.localstack.cloud/user-guide/integrations/aws-cli/)   |

note:
alternative to AWS Local cli:

```sh
alias awslocal='aws --endpoint-url http://127.0.0.1:4566'
```

- Set up environment

```sh
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=ap-south-1
```

- Start localstack using Docker

```sh
docker-compose up -d
```

- Deploy the aws infrastructure

```sh
cd infrastructure/dev
tflocal init
tflocal apply --auto-approve
cd -
```

- Get the secrets for .env file

```shell
 aws secretsmanager get-secret-value --secret-id MyAppSecrets --region ap-south-1
```

- Run the application

```sh
yarn install --frozen-lockfile
yarn run dev
```

## Creating docker image

```sh
docker build -t zell-fresh-nest-js .  --no-cache
```

## Testing the docker image locally

```sh
docker-compose -f docker-compose-integration-test.yaml  up -d --force-recreate
```

# Testing on localstack

```sh
docker tag zell-fresh-nest-js:latest localhost.localstack.cloud:4510/zell-fresh-nest-js:latest
awslocal ecr get-login-password | docker login --username AWS --password-stdin localhost.localstack.cloud:4510
docker push localhost.localstack.cloud:4510/zell-fresh-nest-js:latest
cd infrastructure/integration-test
```

# For pushing code to prod

First set up aws account id:

```sh
export AWS_ACCOUNT_ID=<aws_account_id>
```

Then run the following commands:

```sh
docker build -t zell-fresh-nest-js . --no-cache
docker tag zell-fresh-nest-js:latest $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/zell-fresh-nest-js:latest
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com
docker push $AWS_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/zell-fresh-nest-js:latest
# change the image in the terraform file
cd infrastructure/prod
terraform init
terraform apply --auto-approve
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.
