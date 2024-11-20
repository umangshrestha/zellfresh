import { ListCartsVerboseQuery } from '../../__generated__/graphql.ts';
import { ProductKey } from '../Product';

export type CartMutationFunctions = {
  onAddItemToCart: (uniqueProductInput: ProductKey, count: number) => void;
  getProductCount: (uniqueProductInput: ProductKey) => number;
};

export type CartMutation = {
  loading: boolean;
  data: ListCartsVerboseQuery['cart']['items'];
} & CartMutationFunctions;
