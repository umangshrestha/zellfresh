import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import { useCartCount } from '../hooks/CartCount';
import { CartIcon } from './CartIcon';

export default () => {
  const { cartCount } = useCartCount();
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <CartIcon count={cartCount} onClick={() => navigate('/cart')} />
    </ErrorBoundary>
  );
};
