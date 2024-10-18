import { CartItemType } from '../CartItem/CartItem.types';
import { AddItemToCartMutationFunction } from '../hooks/AddItemToCart/AddItemToCart.types';

export interface CartListProps extends AddItemToCartMutationFunction {
  data: CartItemType[];
  loading: boolean;
}
