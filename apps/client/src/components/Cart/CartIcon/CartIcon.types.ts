import type { Dispatch, SetStateAction } from 'react';

export interface CartIconProps {
  onClick: () => void;
}

export type CartIconContextType = {
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
};
