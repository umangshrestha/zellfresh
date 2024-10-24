import { z } from 'zod';
import { ProductFilterSchema } from './ProductFilter.schema';

export type ProductPageOrderBy = Pick<ProductFilterType, 'sortBy' | 'sortAsc'>;

export type ProductFilterType = z.infer<typeof ProductFilterSchema>;

export interface ProductFilterProps {
  maxPrice: number;
}
