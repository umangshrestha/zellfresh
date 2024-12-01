import { ApolloError } from '@apollo/client';
import { ListCartsQuery } from '../../../__generated__/graphql.ts';

export type CartPageProps = {
  data?: ListCartsQuery;
  loading: boolean;
  error?: ApolloError;
  onClearCart: () => void;
  onAddItemToCart: (productId: string, quantity: number) => void;
};
