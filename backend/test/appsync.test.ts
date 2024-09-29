import {
  AppSyncClient,
  ListApiKeysCommand,
  ListGraphqlApisCommand,
  CreateApiKeyCommand,
} from "@aws-sdk/client-appsync";
import axios from "axios";
import * as APITypes from "../graphql/types/graphql";
import * as queries from "../graphql/types/queries";
import * as mutation from "../graphql/types/mutations";
import * as fs from "fs";
import exp = require("constants");

let apiKey: string;
let graphqlApiId: string;
let graphqlUrl: string;
const mockData = JSON.parse(
  fs.readFileSync("./test/mockproduct.json", "utf-8"),
) as APITypes.ProductInput[];

const sendGraphQLQuery = async <TVariables, TResult>(
  query: string,
  variables: TVariables,
): Promise<{ data: TResult; error: Error }> => {
  const response = await axios.post(
    graphqlUrl,
    {
      query,
      variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    },
  );
  return response.data;
};

beforeAll(async () => {
  const client = new AppSyncClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
    endpoint: "http://127.0.0.1:4566",
  });
  const appsyncName = "ecommerce-appsync-api";
  const graphqlApisCommand = new ListGraphqlApisCommand({});
  try {
    const data = await client.send(graphqlApisCommand);
    if (!data.graphqlApis) {
      throw new Error("No APIs found");
    }
    for (const api of data.graphqlApis) {
      if (api.name === appsyncName) {
        graphqlUrl = api.uris?.GRAPHQL as string;
        const apiKeyCommand = new ListApiKeysCommand({ apiId: api.apiId });
        const apiKeyData = await client.send(apiKeyCommand);
        if (apiKeyData.apiKeys) {
          apiKey = apiKeyData.apiKeys[0].id as string;
          graphqlApiId = api.apiId as string;
        } else {
          const createApiKeyCommand = new CreateApiKeyCommand({
            apiId: api.apiId,
          });
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
    const result = await sendGraphQLQuery<
      typeof variables,
      APITypes.HelloQuery
    >(queries.hello, variables);

    expect(result.data.hello).toBe("Hello, John!");
    expect(result.error).toBe(undefined);
  });

  test("Hello query test (no arguments)", async () => {
    const variables = {};
    const result = await sendGraphQLQuery<
      typeof variables,
      APITypes.HelloQuery
    >(queries.hello, variables);
    expect(result.data.hello).toBe("Hello, World!");
    expect(result.error).toBe(undefined);
  });

  test("Product query test (not exists)", async () => {
    const variables = { id: "1" };
    const result = await sendGraphQLQuery<
      typeof variables,
      APITypes.ProductQuery
    >(queries.product, variables);
    expect(result.data.product).toEqual(null);
    expect(result.error).toBe(undefined);
  });

  test("Products query test (no return)", async () => {
    const limit = 1;
    const cursor =
      "eyJpZCI6IHsiUyI6ICI5MzQwMDk4ZC0yNjJiLTRjZWEtOTc2Yy0yZDM4MzBiMDQwZTgifX0=";
    const variables = { limit, cursor };
    const result = await sendGraphQLQuery<
      typeof variables,
      APITypes.ProductsQuery
    >(queries.products, variables);
    expect(result.data.products).toMatchObject({
      __typename: "PaginatedProducts",
      items: [],
      pagination: {
        __typename: "Pagination",
        limit,
        next: null,
        prev: cursor,
      },
    });
    expect(result.error).toBe(undefined);
  });

  test.each(mockData)(
    "PutProductMutation query test (return)",
    async (product) => {
      const variables = { product };
      const result = await sendGraphQLQuery<
        typeof variables,
        APITypes.PutProductMutation
      >(mutation.putProduct, variables);
      expect(result.error).toBe(undefined);
      expect(result.data.putProduct).toMatchObject({
        __typename: "Product",
        ...product,
      });
    },
  );
});
