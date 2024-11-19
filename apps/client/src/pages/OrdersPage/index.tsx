import { lazy } from 'react';

const OrdersPage = lazy(() =>
  import('./OrdersPage.tsx').then((module) => ({
    default: module.OrdersPage,
  })),
);
export default OrdersPage;
