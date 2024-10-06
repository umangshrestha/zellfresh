import { initializeAppSync } from "./appsync";
import { initializeCognito } from "./cognito";
import axios from "axios";

interface Options {
  role?: "admin" | "user" | "guest";
}

export class GraphQLClient {
  constructor(
    private readonly appsynConfig: Awaited<
      ReturnType<typeof initializeAppSync>
    >,
    private readonly cognitoConfig: Awaited<
      ReturnType<typeof initializeCognito>
    >,
  ) {}

  async sendGraphQLQuery<TVariables, TResult>(
    query: string,
    variables: TVariables,
    options?: Options,
  ): Promise<{
    data: TResult;
    errors?: { errorType: string; locations: string; message: string }[];
  }> {
    const { role = "guest" } = options || {};
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (role == "guest") {
      //   headers["x-api-key"] = this.appsynConfig.apiKey;
    } else {
      headers["Authorization"] = `Bearer ${this.cognitoConfig[role]}`;
    }
    const config = { headers };
    const data = { query, variables };
    const response = await axios.post(
      this.appsynConfig.graphqlUrl,
      data,
      config,
    );
    if (response.data.errors)
      response.data.errors.forEach((error: Error) =>
        console.error(error.message),
      );
    return response.data;
  }
}
