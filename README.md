# To run the server locally


## Running Appsync locally using Localstack

* Set up environment
```sh
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
export LOCALSTACK_API_KEY=<your-key>
```
*  deploy docker
```sh
docker-compose up -d
```

* run the server
```sh
cd appsync
yarn install
yarn run local:bootstrap
aws --endpoint-url http://127.0.0.1:4566 s3 mb s3://cdk-hnb659fds-assets-000000000000-us-east1cur
yarn run local:deploy   
```

* Set Graphql in environment

```sh
export GRAPHQL_ENDPOINT=$(aws --endpoint-url http://127.0.0.1:4566 appsync list-graphql-apis | jq -r '.graphqlApis[0].uris.GRAPHQL')
export API_ID=$(aws --endpoint-url http://127.0.0.1:4566 appsync list-graphql-apis | jq -r '.graphqlApis[0].apiId'
cad19001232d462aaf8327f5f9)
export API_KEY=$(aws --endpoint-url http://localhost.localstack.cloud:4566 appsync create-api-key \
--api-id $API_ID \                         
--description "LocalStack API Key" \          
--expires 1630509300)
```


* Do Sanity check for backend
```sh
curl -X POST $GRAPHQL_ENDPOINT \
-H "Content-Type: application/json" \
-H "x-api-key: $API_KEY" \
-d '{"query": "query { hello(name: \"World\") }"}'
```


