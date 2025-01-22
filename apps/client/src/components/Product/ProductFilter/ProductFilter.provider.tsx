import { LayoutProps as ProductFilterProviderProps } from '@/components/Layout';
import { ProductFilterSchema, ProductFilterType } from '@repo/form-validator';
import { useSearchParams } from 'react-router-dom';
import { ProductFilterContext } from './ProductFilter.context';
import { ProductFilterContextType } from './ProductFilter.types';

export const ProductFilterProvider = ({
  children,
}: ProductFilterProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: productFilter, error } = ProductFilterSchema.safeParse(
    Object.fromEntries(searchParams),
  );
  if (error) {
    setSearchParams(new URLSearchParams());
  }

  const updateProductFilter = (newParams: ProductFilterType) => {
    const newUrlSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        newUrlSearchParams.set(key, value.toString());
      } else {
        newUrlSearchParams.delete(key);
      }
    });
    setSearchParams(newUrlSearchParams);
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
