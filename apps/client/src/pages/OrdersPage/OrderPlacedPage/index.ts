import { lazy } from 'react';

const OrderPlacedPage = lazy(() =>
  import('./OrderPlacedPage.tsx').then((module) => ({
    default: module.OrderPlacedPage,
  })),
);
export default OrderPlacedPage;
