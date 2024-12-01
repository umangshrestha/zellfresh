import { lazy } from 'react';

const HomePage = lazy(() =>
  import('./HomePage.tsx').then((module) => ({ default: module.HomePage })),
);
export default HomePage;
