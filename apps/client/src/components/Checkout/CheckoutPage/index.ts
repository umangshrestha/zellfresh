import { lazy } from 'react';

const CheckoutPage = lazy(() =>
  import('./CheckoutPage.tsx').then((module) => ({
    default: module.CheckoutPage,
  })),
);

export default CheckoutPage;
