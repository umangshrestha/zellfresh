import { createContext } from 'react';
import type { CartCountContextType } from './CartCount.types';

export const CartCountContext = createContext<CartCountContextType | null>(
  null,
);
