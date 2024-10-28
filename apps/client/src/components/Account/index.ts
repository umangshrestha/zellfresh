import { lazy } from 'react';

const Account = lazy(() =>
  import('./Account').then((module) => ({ default: module.Account })),
);

export default Account;
