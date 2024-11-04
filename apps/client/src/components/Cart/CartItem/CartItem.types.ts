import { CartItem, Product } from '../../../__generated__/types';
import { CartMutationFunctions } from '../Cart.types';

export type CartItemType = Pick<
  Product,
  | 'productId'
  | 'name'
  | 'price'
  | 'imageUrl'
  | 'availableQuantity'
  | 'limitPerTransaction'
  | 'description'
  | 'unit'
  | 'category'
> &
  Pick<CartItem, 'quantity'>;

export type CartItemProps = CartItemType & CartMutationFunctions;
