import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { LayoutProps as ProductFilterProviderProps } from '../../Layout';
import { ProductFilterContext } from './ProductFilter.context';
import { ProductFilterSchema } from './ProductFilter.schema';
import {
  ProductFilterContextType,
  ProductFilterType,
} from './ProductFilter.types';

export const ProductFilterProvider = ({
  children,
}: ProductFilterProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: productFilter, error } = ProductFilterSchema.safeParse(
    Object.fromEntries(searchParams),
  );
  useEffect(() => {
    if (error) setSearchParams(new URLSearchParams());
  }, [error, setSearchParams]);

  const updateProductFilter = (newParams: ProductFilterType) => {
    const newUrlSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined) {
        newUrlSearchParams.set(key, value.toString());
      } else {
        newUrlSearchParams.delete(key);
      }
    });
    if (newUrlSearchParams.toString() === searchParams.toString()) return;
    ProductFilterSchema.parseAsync(Object.fromEntries(newUrlSearchParams))
      .then(() => {
        setSearchParams(newUrlSearchParams);
      })
      .catch((error) => {
        if (error instanceof z.ZodError) {
          console.error(error.errors);
        } else {
          console.error(error, typeof error);
        }
      });
  };

  const contextValue: ProductFilterContextType = {
    productFilter,
    updateProductFilter,
    resetProductFilter: () => setSearchParams(new URLSearchParams()),
  };

  return (
    <ProductFilterContext.Provider value={contextValue}>
      {children}
    </ProductFilterContext.Provider>
  );
};
