import { AWS_CONFIG, APPSYNC_NAME } from "./config";
import {
  AppSyncClient,
  ListApiKeysCommand,
  ListGraphqlApisCommand,
  CreateApiKeyCommand,
} from "@aws-sdk/client-appsync";
import axios from "axios";

const client = new AppSyncClient(AWS_CONFIG);

interface Options {
  x_api_key?: boolean;
  additionalHeaders?: Record<string, string>;
}

export const findAppSyncApiId = async (apiName: string) => {
  const graphqlApisCommand = new ListGraphqlApisCommand({});
  const data = await client.send(graphqlApisCommand);
  for (const api of data.graphqlApis || []) {
    if (api.name === apiName) return api;
  }
  throw new Error("No API found");
};

const getExistingApiKey = async (apiId: string) => {
  const apiKeyCommand = new ListApiKeysCommand({ apiId });
  const apiKeyData = await client.send(apiKeyCommand);
  return apiKeyData.apiKeys?.[0]?.id;
};

const createApiKey = async (apiId: string) => {
  const createApiKeyCommand = new CreateApiKeyCommand({
    apiId,
  });
  const createApiKeyData = await client.send(createApiKeyCommand);
  return createApiKeyData.apiKey?.id;
};

export const initializeAppSync = async () => {
  const api = await findAppSyncApiId(APPSYNC_NAME);
  const apiId = api.apiId as string;
  const graphqlUrl = api.uris?.GRAPHQL as string;
  const apiKey = ((await getExistingApiKey(apiId)) ||
    (await createApiKey(apiId))) as string;

  return {
    graphqlUrl,
    apiKey,
  };
};

export class GraphQLClient {
  constructor(
    private readonly graphqlUrl: string,
    private readonly apiKey: string,
    private readonly adminApiKey: string,
    private readonly userApiKey: string,
  ) {}

  async sendGraphQLQuery<TVariables, TResult>(
    query: string,
    variables: TVariables,
    options?: Options,
  ): Promise<{ data: TResult; error: Error }> {
    const { additionalHeaders = {}, x_api_key = false } = options || {};
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(additionalHeaders || {}),
    };
    if (x_api_key) {
      headers["x-api-key"] = this.apiKey;
    }
    const config = { headers };
    const data = { query, variables };
    const response = await axios.post(this.graphqlUrl, data, config);
    if (response.data.errors)
      response.data.errors.forEach((error: Error) =>
        console.error(error.message),
      );
    return response.data;
  }
}
