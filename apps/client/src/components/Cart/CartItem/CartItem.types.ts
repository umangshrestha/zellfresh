import { g } from '@repo/api-client';

export type CartItemProps = g.ListCartsQuery['cart']['items'][0] & {
  onAddItemToCart?: (productId: string, quantity: number) => void;
};
