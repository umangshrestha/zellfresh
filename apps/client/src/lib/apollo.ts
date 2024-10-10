import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useStorageStore } from './store';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers,
  };
});

const errorLink = onError(({ networkError }) => {
  if (
    networkError &&
    // @ts-ignore
    networkError?.statusCode === 401
  ) {
    useStorageStore.getState().logout({});
  }
});
export const apolloClient = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});
