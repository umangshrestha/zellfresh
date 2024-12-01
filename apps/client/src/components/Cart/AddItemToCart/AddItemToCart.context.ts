import { createContext } from 'react';
import { AddItemToCartContextType } from './AddItemToCart.types.ts';

export const AddItemToCartContext =
  createContext<AddItemToCartContextType | null>(null);

