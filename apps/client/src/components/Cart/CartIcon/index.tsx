import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import { useCartCount } from '../hooks/CartCount';
import { CartIcon } from './CartIcon';

const CartIconWithCount = () => {
  const { cartCount } = useCartCount();
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <CartIcon count={cartCount} onClick={() => navigate('/cart')} />
    </ErrorBoundary>
  );
};

export default CartIconWithCount;