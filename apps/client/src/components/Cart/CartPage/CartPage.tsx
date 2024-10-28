import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '..';
import { CartEmptyPage } from '../CartEmptyPage';
import CartList from '../CartList';

export const CartPage = () => {
  const navigate = useNavigate();
  const { loading, data, ...functions } = useCart({
    verbose: true,
  });

  if (!loading && !data.length) {
    return <CartEmptyPage onClick={() => navigate('/')} />;
  }

  return (
    <React.Fragment>
      <CartList {...functions} loading={loading} data={data} />
    </React.Fragment>
  );
};
