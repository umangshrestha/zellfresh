import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { createClient } from 'graphql-ws';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:3000/graphql' }));

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   // wsLink,
//   httpLink,
// );

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
