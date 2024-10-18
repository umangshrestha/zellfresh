import { Product } from '../../../__generated__/types';
import { AddItemToCartMutationFunction } from '../hooks/AddItemToCart/AddItemToCart.types';

export type CartItemType = Pick<
  Product,
  | 'productId'
  | 'name'
  | 'price'
  | 'imageUrl'
  | 'availableQuantity'
  | 'limitPerTransaction'
  | 'description'
>;

export type CartItemProps = CartItemType & AddItemToCartMutationFunction;
