import { withCartSubscription } from '@repo/api-client';
import { CartIcon as Icon } from './CartIcon';

const CartIcon = withCartSubscription(Icon);

export default CartIcon;
