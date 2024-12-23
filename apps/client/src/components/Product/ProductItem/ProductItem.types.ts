import { ProductItemType } from '@repo/api-client';

export type ProductProps = ProductItemType & {
  onAddItemToCart: (productId: string) => void;
};
