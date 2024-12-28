import { ProductFilterType } from '@repo/form-validator';

export type ProductPageOrderBy = Pick<ProductFilterType, 'sortBy' | 'sortAsc'>;

export type ProductFilterContextType = {
  productFilter?: ProductFilterType;
  updateProductFilter: (val: ProductFilterType | object) => void;
  resetProductFilter: () => void;
};
