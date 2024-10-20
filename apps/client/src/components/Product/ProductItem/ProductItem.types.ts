import { Product } from '../../../__generated__/types';
import { UseCartMutationFunctions } from '../../Cart/hooks/useCart';
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

export type ProductProps = ProductItemType & UseCartMutationFunctions;
