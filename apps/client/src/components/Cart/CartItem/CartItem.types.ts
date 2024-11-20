import type { ListCartsVerboseQuery } from '../../../__generated__/graphql.ts';
import { CartMutationFunctions } from '../Cart.types.ts';

export type CartItemProps = ListCartsVerboseQuery['cart']['items'][0] &
  CartMutationFunctions;
