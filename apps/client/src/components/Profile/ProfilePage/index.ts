import { lazy } from 'react';

const ProfilePage = lazy(() =>
  import('./ProfilePage.tsx').then((module) => ({ default: module.ProfilePage })),
);

export default ProfilePage;
