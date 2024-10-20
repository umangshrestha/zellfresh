import { useNavigate } from 'react-router-dom';
import CartList from '../CartList';
import { useCart } from '../hooks/useCart';

export const CartPage = () => {
  const navigate = useNavigate();
  const functions = useCart({
    verbose: true,
  });

  return (
    <>
      <CartList {...functions} onEmptyStateClicked={() => navigate('/')} />
    </>
  );
};
