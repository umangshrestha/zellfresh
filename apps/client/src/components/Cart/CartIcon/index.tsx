import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import { useNotification } from '../../Notification';
import { CartIcon } from './CartIcon';
import { COUNT_QUERY } from './CartIcon.queries';

const CartIconWithApi = () => {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const { data, error } = useQuery(COUNT_QUERY);
  const count = data?.count || 0;

  useEffect(() => {
    if (error) {
      setNotification({
        message: 'Failed to load cart count',
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  return (
    <ErrorBoundary>
      <CartIcon count={count} onClick={() => navigate('/cart')} />
    </ErrorBoundary>
  );
};

export default CartIconWithApi;
