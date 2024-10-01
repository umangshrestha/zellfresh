import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useStorageStore } from "./store";
import { onError } from "@apollo/client/link/error";
import { X_API_KEY, GRPAHQL_URL } from "../config/graphql";


const httpLink = createHttpLink({
  uri: GRPAHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const { token, provider } = useStorageStore.getState();
  return {
    headers: {
      ...headers,
      "accept": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ networkError }) => {
  if (networkError && 
    // @ts-ignore
    networkError?.statusCode === 401) {
    useStorageStore.getState().logout();
  }
});
export const apolloClient = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});
