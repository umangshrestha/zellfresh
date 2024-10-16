import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LayoutProps as CartCountProviderProps } from '../../../Layout';
import { useNotification } from '../../../Notification';
import { CartCountContext } from './CartCount.context';
import { CART_COUNT_QUERY } from './CartCount.queries';
import { CartCountContextType } from './CartCount.types';

export const CartCountProvider = ({ children }: CartCountProviderProps) => {
  const { data, error, refetch } = useQuery(CART_COUNT_QUERY);
  const { setNotification } = useNotification();
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setCartCount(data.cart.count);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  const contextValue: CartCountContextType = {
    cartCount,
    setCartCount,
    refetch,
  };
  return (
    <CartCountContext.Provider value={contextValue}>
      {children}
    </CartCountContext.Provider>
  );
};
