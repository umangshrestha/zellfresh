import type { ListCartsQuery } from '../../../__generated__/graphql.ts';
import { CartMutationFunctions } from '../Cart.types.ts';

export type CartItemProps = ListCartsQuery['cart']['items'][0] &
  CartMutationFunctions;
