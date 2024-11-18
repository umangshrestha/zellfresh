import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split, Operation,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { useEffect, useState } from 'react';
import { useStorageStore } from '../lib/store'; // Assuming you are using a store for user details
import { LayoutProps } from './Layout';
import { StorageState } from '../lib/store/types.ts';


const httpLink = createHttpLink({
  uri: '/graphql',
});


const test = ({ query }: Operation) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
}

const createWsLink = (userDetails: StorageState['userDetails'] | null) => {
  if (!userDetails) {
    return null;
  }
  try {
    return new GraphQLWsLink(
      createClient({
        url: '/subscriptions',
        connectionParams: userDetails || {},
      }),
    );
  } catch (error) {
    console.error('Error creating WebSocket link:', error);
    return null;
  }
};

const ApolloClientProvider = ({ children }: LayoutProps) => {
  const { userDetails } = useStorageStore(); // Get user details from the store
  

  const [wsLink, setWsLink] = useState<GraphQLWsLink | null>(createWsLink(userDetails));


  useEffect(() => {
    setWsLink(createWsLink(userDetails));
  }, [userDetails]);



  // Create the Apollo Client with both HTTP and WebSocket links
  const client = new ApolloClient({
    link : wsLink? split(
      test,
      wsLink,
      httpLink,
    ) : httpLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
