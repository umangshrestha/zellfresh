import { ListCartsQuery } from '@repo/api-client/dist/__generated__/graphql';

export type CartItemProps = ListCartsQuery['cart']['items'][0] & {
  onAddItemToCart?: (productId: string, quantity: number) => void;
};
