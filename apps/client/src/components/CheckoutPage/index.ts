import { lazy } from 'react';

const CheckoutPage = lazy(() =>
  import('./CheckoutPage').then((module) => ({ default: module.CheckoutPage })),
);

export default CheckoutPage;
