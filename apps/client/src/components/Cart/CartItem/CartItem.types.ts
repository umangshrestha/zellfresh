import { Product } from '../../../__generated__/types';
import { UseCartMutationFunctions } from '../hooks/useCart/useCart.types';

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

export type CartItemProps = CartItemType & UseCartMutationFunctions;
