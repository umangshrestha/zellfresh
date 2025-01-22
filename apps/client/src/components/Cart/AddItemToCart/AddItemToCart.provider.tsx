import { LayoutProps as AddItemToCarProviderProps } from '@/components/Layout';
import { useState } from 'react';
import { AddItemToCartContext } from './AddItemToCart.context.ts';
import { AddItemToCartContextType } from './AddItemToCart.types.ts';

export const AddItemToCartProvider = ({
  children,
}: AddItemToCarProviderProps) => {
  const [productId, setProductId] = useState<string | null>(null);
  const contextValue: AddItemToCartContextType = {
    productId,
    setProductId,
  };
  return (
    <AddItemToCartContext.Provider value={contextValue}>
      {children}
    </AddItemToCartContext.Provider>
  );
};
