import type { Product } from '../../../__generated__/types';
import { CartMutationFunctions } from '../../Cart';
export type ProductItemType = Pick<
  Product,
  | 'productId'
  | 'name'
  | 'description'
  | 'price'
  | 'imageUrl'
  | 'availableQuantity'
  | 'rating'
  | 'limitPerTransaction'
  | 'badgeText'
  | 'unit'
  | 'category'
  | 'tags'
>;

export type ProductProps = ProductItemType & CartMutationFunctions;
