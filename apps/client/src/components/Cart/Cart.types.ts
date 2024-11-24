import { ProductKey } from '../Product';

export type CartMutationFunctions = {
  onAddItemToCart: (uniqueProductInput: ProductKey, count: number) => void;
  getProductCount: (uniqueProductInput: ProductKey) => number;
};
