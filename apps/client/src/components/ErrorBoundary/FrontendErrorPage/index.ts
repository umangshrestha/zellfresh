import { lazy } from 'react';

const FrontendErrorPage = lazy(() =>
  import('./FrontendErrorPage.tsx').then((module) => ({
    default: module.FrontendErrorPage,
  })),
);
export default FrontendErrorPage;
