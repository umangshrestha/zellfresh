import { useContext } from 'react';
import { CartCountContext } from './CartCount.context';

export const useCartCount = () => {
  const context = useContext(CartCountContext);
  if (!context) {
    throw new Error('useCartCount must be used within a CartCountProvider');
  }
  return context;
};
