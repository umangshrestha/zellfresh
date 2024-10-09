import { Product } from '../../../types/graphql';
export type ProductItemType = Pick<
  Product,
  | 'id'
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
