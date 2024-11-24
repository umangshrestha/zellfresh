import { useCart } from '../../components/Cart';
import CartPageComponent from '../../components/Cart/CartPage';

export const CartPage = () => {
  const props = useCart();
  return <CartPageComponent {...props} />;
};
