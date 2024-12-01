import { useContext } from 'react';
import { AddItemToCartContext } from './AddItemToCart.context.ts';

export const useAddItemToCart = () => {
  const context = useContext(AddItemToCartContext);
  if (!context) {
    throw new Error(
      'useAddItemToCart must be used within a AddItemToCartProvider',
    );
  }
  return context;
};
