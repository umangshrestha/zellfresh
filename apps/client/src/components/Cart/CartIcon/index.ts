import { CartIcon as Icon } from './CartIcon';
import { withCartIconSubscription } from './CartIconSubscription.hoc';

const CartIcon = withCartIconSubscription(Icon);

export default CartIcon;
