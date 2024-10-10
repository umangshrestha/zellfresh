import { lazy } from 'react';

const ProductPage = lazy(() =>
  import('./ProductPage').then((module) => ({ default: module.ProductPage })),
);
export default ProductPage;
