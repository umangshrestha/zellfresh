import { ApolloError } from '@apollo/client';
import { ListProductsQuery } from '../../../__generated__/graphql.ts';

export type ProductsPageProps = {
  data?: ListProductsQuery;
  loading: boolean;
  error?: ApolloError;
  loadMore: () => void;
  onAddItemToCart: (productId: string) => void;
};
