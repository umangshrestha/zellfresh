import { Product } from '../../../__generated__/types';
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
>;

export type CartItemProps = CartItemType & CartMutationFunctions;
