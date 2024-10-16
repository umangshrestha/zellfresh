import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import { useNotification } from '../../Notification';
import { CartIcon } from './CartIcon';
import { COUNT_QUERY } from './CartIcon.queries';

const CartIconWithApi = () => {
  const { data: initialData } = useQuery(COUNT_QUERY);
  const { setNotification } = useNotification();
  // const { data, error } = useSubscription(COUNT_SUBSCRIPTION);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setCount(initialData.cart.count);
    }
  }, [initialData]);

  // useEffect(() => {
  //   if (error) {
  //     setNotification({
  //       message: 'Failed to load cart count',
  //       severity: 'error',
  //     });
  //   }
  // }, [error, setNotification]);

  // useEffect(() => {
  //   if (data) {
  //     setCount(data.cartCountUpdated);
  //   }
  // }, [data]);

  return (
    <ErrorBoundary>
      <CartIcon count={count} onClick={() => navigate('/cart')} />
    </ErrorBoundary>
  );
};

export default CartIconWithApi;
