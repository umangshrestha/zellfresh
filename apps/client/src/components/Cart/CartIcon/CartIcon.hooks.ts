import { useContext } from 'react';
import { CartIconContext } from './CartIcon.context';

export const useCartIcon = () => {
  const context = useContext(CartIconContext);
  if (!context) {
    throw new Error('useCartCount must be used within a CartCountProvider');
  }
  return context;
};
