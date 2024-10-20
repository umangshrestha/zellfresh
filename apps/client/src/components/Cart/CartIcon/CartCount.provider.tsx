import { useState } from 'react';
import { LayoutProps as CartIconProviderProps } from '../../Layout';
import { CartIconContext } from './CartIcon.context';
import { CartIconContextType } from './CartIcon.types';

export const CartIconProvider = ({ children }: CartIconProviderProps) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const contextValue: CartIconContextType = {
    cartCount,
    setCartCount,
  };
  return (
    <CartIconContext.Provider value={contextValue}>
      {children}
    </CartIconContext.Provider>
  );
};
