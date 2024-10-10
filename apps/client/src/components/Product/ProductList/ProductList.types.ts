import { ApolloError } from '@apollo/client';
import { ProductItemType } from '../ProductItem';

export interface ProductListProps {
  data: ProductItemType[];
  loading: boolean;
  error: ApolloError | undefined;
  onAddToCart: (id: string) => void;
}
