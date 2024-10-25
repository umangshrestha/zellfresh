import { useContext } from 'react';
import { ProductFilterContext } from './ProductFilter.context';

export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error(
      'useProductFilter must be used within a ProductFilterProvider',
    );
  }
  return context;
};
