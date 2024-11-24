import { useCart } from '../Cart.hooks.ts';
import { CartPage as CartPageComponent } from './CartPage';

const CartPage = () => {
  const props = useCart();
  return <CartPageComponent {...props} />;
};

export default CartPage;
