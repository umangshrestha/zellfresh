import { ProductKey } from '../Product';
import { ListCartsQueryVerboseQuery } from '../../__generated__/graphql.ts';

export type CartMutationFunctions = {
  onAddItemToCart: (uniqueProductInput: ProductKey, count: number) => void;
  getProductCount: (uniqueProductInput: ProductKey) => number;
};

export type CartMutation = {
  loading: boolean;
  data: ListCartsQueryVerboseQuery['cart']['items'];
} & CartMutationFunctions;
