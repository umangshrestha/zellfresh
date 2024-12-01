import type { ListProductsQuery } from '../../../__generated__/graphql.ts';

export type ProductItemType = ListProductsQuery['products']['items'][0];

export type ProductProps = ProductItemType & {
  onAddItemToCart: (productId: string) => void;
};
