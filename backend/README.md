# Pre requisite
Make sure localstack is running.


| Script                             | Description                                          |
| ---------------------------------- | ---------------------------------------------------- |
| ```sh yarn run local:bootstrap ``` | Initialize terraform provider with localstack        |
| ```sh  yarn run codegen     ```    | Compiling graphql schema to types and queries        |
| ```sh  yarn run predeploy  ```     | Convert Typescript resolvers to javascript resolvers |
| ```sh  yarn run local:deploy ```   | to deploy appsync shema                              |
| ```sh yarn run test ```            | Do quick sanity of resolvers using jest              |
| ```sh yarn run format ```          | Format the code based on project guideline           |


The local:deploy requires google_client_id. Please create the file `./infrastrucre/terrafom.tfvars` and add the secrets as:

```
google_client_id = Your google client id
```