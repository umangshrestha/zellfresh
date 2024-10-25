import { createContext } from 'react';
import type { ProductFilterContextType } from './ProductFilter.types';

export const ProductFilterContext =
  createContext<ProductFilterContextType | null>(null);
