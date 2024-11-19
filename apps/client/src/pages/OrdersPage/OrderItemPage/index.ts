import { lazy } from 'react';

const OrderItemPage = lazy(() =>
  import('./OrderItemPage.tsx').then((module) => ({
    default: module.OrderItemPage,
  })),
);
export default OrderItemPage;
