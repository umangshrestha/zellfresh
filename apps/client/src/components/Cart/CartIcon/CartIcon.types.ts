import { Dispatch } from 'react';

export interface CartIconProps {
  onClick: () => void;
}

export type CartIconContextType = {
  cartCount: number;
  setCartCount: Dispatch<React.SetStateAction<number>>;
};
