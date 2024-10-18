import { lazy } from 'react';

const ProductPage = lazy(() =>
  import('./NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);
export default ProductPage;
