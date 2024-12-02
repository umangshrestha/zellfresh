import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Operation,
  createHttpLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { LayoutProps } from './Layout';

import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { useEffect, useState } from 'react';
import { useAccount } from './Account';
import { useNotification } from './Notification';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";


if (import.meta.env.NODE_ENV === 'development') {
  loadDevMessages();
  loadErrorMessages();
}

// For network errors, retry the request up to 5 times
const retryLink = new RetryLink({
  delay: {
    initial: 1000,
    max: 5000,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error) => !!error,
  },
});

const httpLink = createPersistedQueryLink({ sha256 }).concat(createHttpLink({
  uri: '/graphql',
}));

const createSubscriptionLink = (accountDetails: Record<string, string>) => {
  return new GraphQLWsLink(
    createClient({
      url: 'ws://localhost:3000/graphql',
      connectionParams: accountDetails,
    }),
  );
};

const isSubscriptionOperation = ({ query }: Operation) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
};

const ApolloClientProvider = ({ children }: LayoutProps) => {
  const { setNotification } = useNotification();
  const { accountDetails } = useAccount();
  const [cache, setCache] = useState(new InMemoryCache());
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    if (accountDetails?.sub !== sub) {
      console.log('Setting up Apollo Client with new account details');
      setSub(accountDetails?.sub || null);
      setCache(new InMemoryCache());
    }
  }, [accountDetails, sub]);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
        setNotification({
          message,
          severity: 'error',
        });
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      setNotification({
        message: 'A network error occurred. Please try again.',
        severity: 'error',
      });
    }
  });

  const linkWithSubscription =
    accountDetails !== null
      ? split(
          isSubscriptionOperation,
          createSubscriptionLink({
            sub: accountDetails.sub,
          }),
          httpLink,
        )
      : httpLink;

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, retryLink, linkWithSubscription]),
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
