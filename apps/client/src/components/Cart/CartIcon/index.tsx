import { useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CART_COUNT_SUBSCRIPTION } from '../Cart.queries';
import { CartIcon as Icon } from './CartIcon';

const CartIcon = () => {
  const { data } = useSubscription(CART_COUNT_SUBSCRIPTION);
  const navigate = useNavigate();
  return (
    <Icon cartCount={data?.cartCount || 0} onClick={() => navigate('/cart')} />
  );
};

export default CartIcon;
