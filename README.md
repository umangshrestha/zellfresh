# To run the server locally


## Running Appsync locally using Localstack


Download localstack wrapper for 

| Tools         | Localstack Wrapper |  Script           | Reference    |
| ------------- | ----------------- | ----------------- | ------------ |
| Terraform       | [tflocal](https://github.com/localstack/terraform-local) | ```sh pip install awscli-local``` | [Localstack Guide](https://docs.localstack.cloud/user-guide/integrations/terraform/)
| Aws Cli       | [awscli-local](https://github.com/localstack/awscli-local) | ```sh pip install awscli-local``` | [Localstack Guide](https://docs.localstack.cloud/user-guide/integrations/aws-cli/)


note:
alternative to AWS cli:
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

* Run the server
```sh
cd backend
yarn install
yarn run local:bootstrap
tflocal init
yarn run local:bootsrap 
```


* Do Sanity check for backend
```sh
curl -X POST $APPSYNC_URL \
-H "Content-Type: application/json" \
-H "x-api-key: $APPSYNC_API_KEY" \
-d '{"query": "query { hello(name: \"World\") }"}'
```




