import { useSubscription } from '@apollo/client';
import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { CART_COUNT_SUBSCRIPTION } from './CartIcon.queries.ts';
import { CartIconProps } from './CartIcon.types.ts';

export const withCartIconSubscription = (
  WrappedComponent: ComponentType<CartIconProps>,
) => {
  return () => {
    const { data } = useSubscription(CART_COUNT_SUBSCRIPTION);
    const navigate = useNavigate();
    return (
      <WrappedComponent
        cartCount={data?.cartCount || 0}
        onClick={() => navigate('/cart')}
      />
    );
  };
};
