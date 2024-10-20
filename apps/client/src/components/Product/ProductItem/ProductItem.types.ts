import { Product } from '../../../__generated__/types';
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
>;

export type ProductProps = ProductItemType & CartMutationFunctions;
