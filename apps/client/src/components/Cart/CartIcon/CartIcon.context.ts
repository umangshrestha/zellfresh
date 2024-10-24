import { createContext } from 'react';
import type { CartIconContextType } from './CartIcon.types';

export const CartIconContext = createContext<CartIconContextType | null>(null);
