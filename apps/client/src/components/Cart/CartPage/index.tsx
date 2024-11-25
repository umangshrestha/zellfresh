import { lazy } from 'react';
import { useCart } from '../Cart.hooks.ts';

const CartPageComponent = lazy(() =>
  import('./CartPage').then((module) => ({ default: module.CartPage })),
);

const CartPage = () => {
  const props = useCart();
  return <CartPageComponent {...props} />;
};

export default CartPage;
