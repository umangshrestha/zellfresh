import { lazy } from 'react';

const CartPage = lazy(() =>
  import('./CartPage').then((module) => ({ default: module.CartPage })),
);
export default CartPage;
