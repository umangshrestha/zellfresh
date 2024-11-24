import { ApolloError } from '@apollo/client';
import { ListCartsVerboseQuery } from '../../../__generated__/graphql.ts';
import { CartMutationFunctions } from '../Cart.types.ts';

export type CartPageProps = {
  data?: ListCartsVerboseQuery;
  loading: boolean;
  error?: ApolloError;
} & CartMutationFunctions;
