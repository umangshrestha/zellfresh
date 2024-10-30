import { Product } from '../../../__generated__/types';

export type CartItemReadOnlyType = Pick<
  Product,
  | 'name'
  | 'price'
  | 'imageUrl'
  | 'availableQuantity'
  | 'description'
  | 'unit'
  | 'category'
>;

export type CartItemReadOnlyProps = CartItemReadOnlyType;
