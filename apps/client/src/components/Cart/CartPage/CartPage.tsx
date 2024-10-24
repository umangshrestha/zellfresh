import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '..';
import CartList from '../CartList';

export const CartPage = () => {
  const navigate = useNavigate();
  const functions = useCart({
    verbose: true,
  });

  return (
    <React.Fragment>
      <CartList {...functions} onEmptyStateClicked={() => navigate('/')} />
    </React.Fragment>
  );
};
