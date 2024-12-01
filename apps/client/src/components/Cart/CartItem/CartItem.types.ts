import type { ListCartsQuery } from '../../../__generated__/graphql.ts';

export type CartItemProps = ListCartsQuery['cart']['items'][0] & {
  onAddItemToCart?: (productId: string, quantity: number) => void;
};
