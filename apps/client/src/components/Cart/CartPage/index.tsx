import { useNotification } from '@/components/Notification';
import { useCart } from '@repo/api-client';
import { lazy } from 'react';

const CartPageComponent = lazy(() =>
  import('./CartPage').then((module) => ({ default: module.CartPage })),
);

const CartPage = () => {
  const { setNotification } = useNotification();
  const props = useCart(() => {
    setNotification({
      message: 'Cart updated',
      severity: 'success',
    });
  });
  return <CartPageComponent {...props} />;
};

export default CartPage;
