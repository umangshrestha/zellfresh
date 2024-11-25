import { ApolloError } from '@apollo/client';
import { ListCartsQuery } from '../../../__generated__/graphql.ts';
import { CartMutationFunctions } from '../Cart.types.ts';

export type CartPageProps = {
  data?: ListCartsQuery;
  loading: boolean;
  error?: ApolloError;
} & CartMutationFunctions;
