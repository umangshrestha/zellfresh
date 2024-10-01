# Overview

| Technologies Used    | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| Programming Language | TypeScript                                                      |
| Runtime              | Node.js ~v20                                                    |
| AWS AppSync          | Managed GraphQL service for real-time data queries and updates. |
| appsync_js           | JavaScript SDK for interacting with AWS AppSync                 |
| AWS Lambda           | Serverless compute service for executing backend logic          |
| HashiCorp Terraform  | Infrastructure as code tool for managing AWS resources          |
| Localstack  | Mocking AWS resources for local development          |


--- 


## Running Appsync locally using Localstack


* Download localstack wrapper for 

| Tools     | Localstack Wrapper                                         | Script                            | Reference                                                                            |
| --------- | ---------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| Terraform | [tflocal](https://github.com/localstack/terraform-local)   | ```sh pip install awscli-local``` | [Localstack Guide](https://docs.localstack.cloud/user-guide/integrations/terraform/) |
| Aws Cli   | [awscli-local](https://github.com/localstack/awscli-local) | ```sh pip install awscli-local``` | [Localstack Guide](https://docs.localstack.cloud/user-guide/integrations/aws-cli/)   |


note:
alternative to AWS Local cli:
```sh
alias awslocal='aws --endpoint-url http://127.0.0.1:4566' 
```


* Set up environment
```sh
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
export LOCALSTACK_API_KEY=<your-key>
```

*  Start localstack using Docker
```sh
docker-compose up -d
```

* Deploy the appsync
```sh
cd backend
yarn run dev
```


## Contributing
Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

