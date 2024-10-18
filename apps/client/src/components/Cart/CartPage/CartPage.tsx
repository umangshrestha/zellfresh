import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../Notification';
import { CARTS_QUERY } from '../Cart.queries';
import CartList from '../CartList';
import { useAddItemToCart } from '../hooks/AddItemToCart/AddItemToCart.hooks';

export const CartPage = () => {
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(CARTS_QUERY);
  const { addItemToCart } = useAddItemToCart();

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  return (
    <CartList
      data={data?.cart?.items?.map((item: any) => ({
        ...item.product,
        quantity: item.quantity,
      }))}
      loading={loading}
      onAddItemToCart={addItemToCart}
      onEmptyStateClicked={() => navigate('/')}
    />
  );
};
