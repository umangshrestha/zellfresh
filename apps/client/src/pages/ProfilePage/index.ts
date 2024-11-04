import { lazy } from 'react';

const ProfilePage = lazy(() =>
  import('./ProfilePage').then((module) => ({ default: module.ProfilePage })),
);

export default ProfilePage;
