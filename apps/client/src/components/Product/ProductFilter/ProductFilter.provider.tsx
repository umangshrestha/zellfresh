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

  const updateProductFilter = (newParams: ProductFilterType) => {
    const { data, success } = ProductFilterSchema.safeParse({
      ...productFilter,
      ...newParams,
    });

    if (!success || JSON.stringify(data) === JSON.stringify(productFilter))
      return;
    setProductFilter(data);
    return;
  };

  const contextValue: ProductFilterContextType = {
    productFilter,
    updateProductFilter,
  };

  return (
    <ProductFilterContext.Provider value={contextValue}>
      {children}
    </ProductFilterContext.Provider>
  );
};
