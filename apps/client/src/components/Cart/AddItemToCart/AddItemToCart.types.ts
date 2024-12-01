import { Dispatch, SetStateAction } from 'react';

export type AddItemToCartContextType = {
  productId: string | null;
  setProductId: Dispatch<SetStateAction<string | null>>;
};