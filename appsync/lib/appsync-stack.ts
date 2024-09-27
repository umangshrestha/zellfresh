import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as path from 'path';


export class AppsyncStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'demo',
      definition: appsync.Definition.fromFile(path.join(__dirname, "../", 'schema', 'schema.graphql')),
    });
    const helloFunction = new appsync.AppsyncFunction(this, 'function', {
      name: 'appsync_function',
      api,
      dataSource: api.addNoneDataSource('none'),
      requestMappingTemplate: appsync.MappingTemplate.fromFile('src/hello/request.vtl'),
      responseMappingTemplate: appsync.MappingTemplate.fromFile('src/hello/response.vtl'),
    });

    new appsync.Resolver(this, 'Resolver', {
      api,
      typeName: 'Query',
      fieldName: 'hello', 
      pipelineConfig: [helloFunction],
    });
  }
}


const environment = process.env.ENVIRONMENT || 'prod';
const envConfig = (environment === 'dev') ? {
  account: '000000000000', // LocalStack default account ID
  region: 'us-east-1',
} : {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
console.log('env', envConfig);
const app = new cdk.App();
new AppsyncStack(app, 'AppsyncStack', {
  env: envConfig
});
app.synth();