import { lazy } from 'react';

const OrderPage = lazy(() =>
  import('./OrderPage').then((module) => ({ default: module.OrderPage })),
);

export default OrderPage;
