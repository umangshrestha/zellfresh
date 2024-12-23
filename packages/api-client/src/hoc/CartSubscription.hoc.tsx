import { useSubscription } from '@apollo/client';
import { ComponentType } from 'react';
import { CART_COUNT_SUBSCRIPTION } from '../query';

interface WithCartSubscriptionProps {
  cartCount: number;
}

export const withCartSubscription = <T extends object>(
  WrappedComponent: ComponentType<T & WithCartSubscriptionProps>,
) => {
  return (props: Omit<T, keyof WithCartSubscriptionProps>) => {
    const { data } = useSubscription(CART_COUNT_SUBSCRIPTION);
    return (
      <WrappedComponent {...(props as T)} cartCount={data?.cartCount || 0} />
    );
  };
};
