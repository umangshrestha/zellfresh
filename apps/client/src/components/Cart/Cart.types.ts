import { ProductKey } from '../Product';
import { CartItemType } from './CartItem';

export type CartMutationFunctions = {
  onAddItemToCart: (uniqueProductInput: ProductKey, count: number) => void;
  getProductCount: (uniqueProductInput: ProductKey) => number;
};

export type CartMutation = {
  loading: boolean;
  data: CartItemType[];
} & CartMutationFunctions;
