import { CheckoutPageQuery } from '@repo/api-client/dist/__generated__/graphql';

export type CheckoutListSectionProps = {
  cart: CheckoutPageQuery['cart'];
};
