import { lazy } from 'react';

const NotFoundPage = lazy(() =>
  import('./NotFoundPage.tsx').then((module) => ({
    default: module.NotFoundPage,
  })),
);
export default NotFoundPage;
