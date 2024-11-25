import { ApolloError } from '@apollo/client';
import { ListProductsQuery } from '../../../__generated__/graphql.ts';
import { CartMutationFunctions } from '../../Cart';

export type ProductPageProps = {
  data?: ListProductsQuery;
  loading: boolean;
  error?: ApolloError;
} & CartMutationFunctions;
