import { z } from 'zod';
import { ProductFilterSchema } from './ProductFilter.schema';

export type ProductPageOrderBy = Pick<ProductFilterType, 'sortBy' | 'sortAsc'>;

export type ProductFilterType = z.infer<typeof ProductFilterSchema>;

export type ProductFilterContextType = {
  productFilter: ProductFilterType;
  updateProductFilter: (val: ProductFilterType | object) => void;
  resetProductFilter: () => void;
};
