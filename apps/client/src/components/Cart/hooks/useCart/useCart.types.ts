import { CartItemType } from '../../CartItem';

export type UseCartMutationFunctions = {
  onAddItemToCart: (id: string, count: number) => void;
  getProductCount: (id: string) => number;
};

export type UseCartMutation = {
  loading: boolean;
  data: CartItemType[];
} & UseCartMutationFunctions;
