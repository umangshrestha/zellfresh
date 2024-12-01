import { lazy } from 'react';

const LoginPage = lazy(() =>
  import('./LoginPage.tsx').then((module) => ({ default: module.LoginPage })),
);

export default LoginPage;
