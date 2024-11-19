import { CartMutation, CartMutationFunctions } from '../Cart.types';

export type CartItemType = CartMutation['data'][0]

export type CartItemProps = CartItemType & CartMutationFunctions;
