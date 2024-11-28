import { lazy } from 'react';

const OrdersAdminPage = lazy(() =>
  import('./OrdersAdminPage.tsx').then((module) => ({
    default: module.OrdersAdminPage,
  })),
);

export default OrdersAdminPage;
