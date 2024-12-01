import { Dispatch, SetStateAction } from 'react';

export type AddItemToCartContextType = {
  productId: string | null;
  setProductId: Dispatch<SetStateAction<string|null>>
};

export type AddItemToCartProps = {
  productId: string;
  onClose: () => void;
};
