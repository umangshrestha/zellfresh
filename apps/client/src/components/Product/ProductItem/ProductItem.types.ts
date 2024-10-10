import { Product } from '../../../__generated__/types';
export type ProductItemType = Pick<
  Product,
  | 'productId'
  | 'name'
  | 'description'
  | 'price'
  | 'imageUrl'
  | 'availableQuantity'
  | 'rating'
  | 'badgeText'
>;

export type ProductProps = ProductItemType & {
  onClick: (id: string) => void;
};
