import { useState } from 'react';
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
  const [productFilter, setProductFilter] = useState<ProductFilterType>({});

  const updateProductFilter = (newParams: Object) => {
    const parsedParams = ProductFilterSchema.safeParse({
      ...productFilter,
      ...newParams,
    });
    if (!parsedParams.success || parsedParams.data === productFilter) return;
    setProductFilter(parsedParams.data);
  };

  const contextValue: ProductFilterContextType = {
    productFilter,
    updateProductFilter,
    resetProductFilter: () => setProductFilter({}),
  };

  return (
    <ProductFilterContext.Provider value={contextValue}>
      {children}
    </ProductFilterContext.Provider>
  );
};
