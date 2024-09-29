
import { AppSyncClient, ListApiKeysCommand, ListGraphqlApisCommand, CreateApiKeyCommand } from "@aws-sdk/client-appsync";
import axios from "axios";
import * as APITypes from "../graphql/types/graphql";
import * as queries from "../graphql/types/queries";
import * as mutation from "../graphql/types/mutations";
import * as fs from "fs";

let apiKey: string;
let graphqlApiId: string;
let graphqlUrl: string;

const sendGraphQLQuery = async <TVariables, TResult>(
    query: string,
    variables: TVariables,
    raiseOnErrors = true
  ): Promise<TResult> => {
    const response = await axios.post(graphqlUrl, {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
    if (response.data.errors) {
        
        if (raiseOnErrors) {
            throw new Error(JSON.stringify(response.data.errors, null, 2));
        }
    }
    return response.data.data as TResult;
};

beforeAll(async () => {
    const client = new AppSyncClient({ region: "us-east-1",
        credentials: {
            accessKeyId: "test",
            secretAccessKey: "test"
        },
        endpoint: "http://127.0.0.1:4566"
    });
    const appsyncName = "ecommerce-appsync-api"
    const graphqlApisCommand = new ListGraphqlApisCommand({});
    try {
        const data =  await client.send(graphqlApisCommand)
        if (!data.graphqlApis) {
            throw new Error("No APIs found");
        }
        for(const api of data.graphqlApis) {
            if(api.name === appsyncName) {    
                graphqlUrl = api.uris?.GRAPHQL as string            
                const apiKeyCommand = new ListApiKeysCommand({ apiId: api.apiId });
                const apiKeyData = await client.send(apiKeyCommand);
                if (apiKeyData.apiKeys) {
                    apiKey = apiKeyData.apiKeys[0].id as string;
                    graphqlApiId = api.apiId as string;
                } else {
                    const createApiKeyCommand = new CreateApiKeyCommand({ apiId: api.apiId });
                    const createApiKeyData = await client.send(createApiKeyCommand);
                    apiKey = createApiKeyData.apiKey?.id as string;
                    graphqlApiId = api.apiId as string;
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
});

describe("GraphQL Tests", () => {
    test("Hello query test", async () => {
      const variables = { name: "John" };
      const result = await sendGraphQLQuery<typeof variables, APITypes.HelloQuery>(queries.hello, variables);
      
      expect(result.hello).toBe("Hello, John!");
    });

    test("Hello query test (no arguments)", async () => {
        const variables = { };
        const result = await sendGraphQLQuery<typeof variables, APITypes.HelloQuery>(queries.hello, variables);
        expect(result.hello).toBe("Hello, World!");
    });

    test("Product query test (not exists)", async () => {
        const variables = { id: "1" };
        const result = await sendGraphQLQuery<typeof variables, APITypes.ProductQuery>(queries.product, variables);
        expect(result.product).toEqual(null);
    });

    test("Put product mutation test", async () => {
        const nockData = fs.readFileSync("./test/mockproduct.json", "utf-8");
        const products = JSON.parse(nockData);
        products.forEach(async (product: APITypes.ProductInput) => {
            const variables = { product };
            const result = await sendGraphQLQuery<typeof variables, APITypes.PutProductMutation>(mutation.putProduct, variables);
            expect(result.putProduct).toBe(product);
        });

    });
});

