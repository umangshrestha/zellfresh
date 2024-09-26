import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useStorageStore } from "./store";
import { onError } from "@apollo/client/link/error";
const httpLink = createHttpLink({
  uri:
    (import.meta.env.VITE_GRAPHQL_URL as string) ||
    "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const { token, provider } = useStorageStore.getState();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      provider: provider ? provider : "",
    },
  };
});

const errorLink = onError(({ networkError }) => {
  if (networkError && networkError?.statusCode === 401) {
    useStorageStore.getState().logout();
  }
});
export const apolloClient = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});
