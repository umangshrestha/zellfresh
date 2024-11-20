import type { CheckoutPageQuery } from '../../../__generated__/graphql';

export type CartItemReadOnlyType = CheckoutPageQuery['cart']['items'][0];

export type CartItemReadOnlyProps = CartItemReadOnlyType;
