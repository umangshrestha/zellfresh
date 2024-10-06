import { GraphQLClient } from "./utils";
import { initializeAppSync } from "./utils/appsync";
import { initializeCognito } from "./utils/cognito";

import * as APITypes from "../graphql/types/graphql";
import * as queries from "../graphql/types/queries";
import * as mutation from "../graphql/types/mutations";
import * as fs from "fs";
import axios from "axios";

const roles = ["admin", "user", "guest"] as const;
type RoleType = (typeof roles)[number];

const mockData = JSON.parse(
  fs.readFileSync("./test/mockproduct.json", "utf-8"),
) as APITypes.ProductInput[];

let graphqlClient: GraphQLClient;

beforeAll(async () => {
  const appsyncConfig = await initializeAppSync();
  console.log(appsyncConfig);
  const cognitoConfig = await initializeCognito();
  console.log(cognitoConfig);
  graphqlClient = new GraphQLClient(appsyncConfig, cognitoConfig);
});

describe("GraphQL Tests", () => {
  test.each(roles)("Hello query test: %s", async (role: RoleType) => {
    const variables = { name: "John" };
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.HelloQueryVariables,
      APITypes.HelloQuery
    >(queries.hello, variables);

    expect(result.data.hello).toBe("Hello, John!");
    expect(result.errors).toBe(undefined);
  });

  test.each(roles)(
    "Hello query test (no arguments)",
    async (role: RoleType) => {
      const variables = {};
      const result = await graphqlClient.sendGraphQLQuery<
        APITypes.HelloQueryVariables,
        APITypes.HelloQuery
      >(queries.hello, variables);
      expect(result.data.hello).toBe("Hello, World!");
      expect(result.errors).toBe(undefined);
    },
  );

  test("Product query test (not exists)", async () => {
    const variables = { id: "1" };
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.ProductQueryVariables,
      APITypes.ProductQuery
    >(queries.product, variables);
    expect(result.data.product).toEqual(null);
    expect(result.errors?.[0].errorType).toBe(undefined);
  });

  test("Products query test (no return)", async () => {
    const limit = 1;
    const cursor =
      "eyJpZCI6IHsiUyI6ICI5MzQwMDk4ZC0yNjJiLTRjZWEtOTc2Yy0yZDM4MzBiMDQwZTgifX0=";
    const variables = { limit, cursor };
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.ProductsQueryVariables,
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
    expect(result.errors).toBe(undefined);
  });

  test.each(mockData)("PutProduct mutation test: admin", async (product) => {
    const variables = { product };
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.AddProductMutationVariables,
      APITypes.AddProductMutation
    >(mutation.addProduct, variables, { role: "admin" });
    expect(result.errors).toBe(undefined);
    expect(result.data.addProduct).toMatchObject({
      __typename: "Product",
      ...product,
    });
  });

  test("PutProduct mutation test: user", async () => {
    const product = mockData[0];
    const variables = { product };
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.AddProductMutationVariables,
      APITypes.AddProductMutation
    >(mutation.addProduct, variables, { role: "user" });
    expect(result.data.addProduct).toBe(null);
    expect(result.errors?.[0]?.errorType).toBe("Unauthorized");
  });

  test("PutProduct mutation test: guest", async () => {
    const product = mockData[0];
    const variables = { product };
    try {
      const result = await graphqlClient.sendGraphQLQuery<
        APITypes.AddProductMutationVariables,
        APITypes.AddProductMutation
      >(mutation.addProduct, variables, { role: "guest" });
      expect("Should not reach here").toBe(result);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        expect(e.response?.status).toBe(401);
        expect(e.response?.data).toMatchObject({
          errors: [
            {
              errorType: "UnauthorizedException",
              message: "You are not authorized to make this call.",
            },
          ],
        });
      }
    }
  });

  test.each(mockData)("Product query test (return): guest", async (product) => {
    const id = product.id as string;
    const variables = { id };
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.ProductQueryVariables,
      APITypes.ProductQuery
    >(queries.product, variables);
    expect(result.errors).toBe(undefined);
    expect(result.data.product).toMatchObject(product);
  });

  test.each(mockData)("Product query test (return): user", async (product) => {
    const id = product.id as string;
    const variables = { id };
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.ProductQueryVariables,
      APITypes.ProductQuery
    >(queries.product, variables);
    expect(result.errors).toBe(undefined);
    expect(result.data.product).toMatchObject(product);
  });

  test.each(roles)("Products query test: %s", async (role: RoleType) => {
    const variables = {};
    const result = await graphqlClient.sendGraphQLQuery<
      APITypes.ProductsQueryVariables,
      APITypes.ProductsQuery
    >(queries.products, variables, {
      role,
    });
    expect(new Set(result.data.products.items.map((x) => x.id))).toMatchObject(
      new Set(mockData.map((x) => x.id)),
    );
    expect(result.errors).toBe(undefined);
  });
});
