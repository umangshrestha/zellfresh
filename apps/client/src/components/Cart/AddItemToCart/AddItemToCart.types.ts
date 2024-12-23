import { Dispatch, SetStateAction } from 'react';
import type { CartItemProps } from '../CartItem';

export type AddItemToCartContextType = {
  productId: string | null;
  setProductId: Dispatch<SetStateAction<string | null>>;
};

export interface AddItemToCartProps extends CartItemProps {
  onClose: () => void;
  onAddItemToCart: (productId: string, quantity: number) => Promise<object>;
}
