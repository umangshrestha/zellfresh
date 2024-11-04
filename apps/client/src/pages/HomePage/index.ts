import { lazy } from 'react';

const HomePage = lazy(() =>
  import('./HomePage').then((module) => ({ default: module.HomePage })),
);
export default HomePage;
