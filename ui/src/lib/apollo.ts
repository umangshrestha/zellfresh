import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useStorageStore } from "./store";

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

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
