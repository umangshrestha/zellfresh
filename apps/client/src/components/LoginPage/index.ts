import { lazy } from 'react';

const LoginPage = lazy(() =>
  import('./LoginPage').then((module) => ({ default: module.LoginPage })),
);

export default LoginPage;
