import { ProductProps } from '../ProductItem';

export type ProductAddItemProps = Pick<
  ProductProps,
  'productId' | 'availableQuantity' | 'limitPerTransaction' | 'onAddItemToCart'
>;
