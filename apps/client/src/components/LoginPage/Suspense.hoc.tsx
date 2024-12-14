import type { ComponentType, PropsWithChildren } from 'react';
import { Suspense } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export const withSuspense = <T extends PropsWithChildren<object>>(
  Component: ComponentType<T>,
) => {
  return (props: T) => (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};
