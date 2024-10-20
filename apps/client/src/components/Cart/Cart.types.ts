import { CartItemType } from './CartItem';

export type CartMutationFunctions = {
  onAddItemToCart: (id: string, count: number) => void;
  getProductCount: (id: string) => number;
};

export type CartMutation = {
  loading: boolean;
  data: CartItemType[];
} & CartMutationFunctions;
