# Pre requisite

Make sure localstack is running.

| Script                     | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| `yarn run local:bootstrap` | Initialize terraform provider with localstack        |
| `yarn run codegen`         | Compiling graphql schema to types and queries        |
| `yarn run predeploy`       | Convert Typescript resolvers to javascript resolvers |
| `yarn run local:deploy`    | to deploy appsync shema                              |
| `yarn run test`            | Do quick sanity of resolvers using jest              |
| `yarn run format`          | Format the code based on project guideline           |

The local:deploy requires google_client_id. Please create the file `./backend/infrastructure/terraform.tfvars` and add the secrets as:

```
google_client_id = Your google client id
```
