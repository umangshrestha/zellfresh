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
  | 'limitPerTransaction'
  | 'badgeText'
>;

export type ProductProps = ProductItemType & {
  onAddItemToCart: (id: string, quantity: number) => void;
};

export type ProductAddItemProps = Pick<
  ProductProps,
  'productId' | 'availableQuantity' | 'limitPerTransaction' | 'onAddItemToCart'
>;
