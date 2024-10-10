import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import { CartIcon } from './CartIcon';
import { COUNT_QUERY } from './CartIcon.queries';

const CartIconWithApi = () => {
  const navigate = useNavigate();
  const { data, error } = useQuery(COUNT_QUERY);
  console.log(data, error);
  const count = data?.count || 0;
  return (
    <ErrorBoundary>
      <CartIcon count={count} onClick={() => navigate('/cart')} />
    </ErrorBoundary>
  );
};

export default CartIconWithApi;
