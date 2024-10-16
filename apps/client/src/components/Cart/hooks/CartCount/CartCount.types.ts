import { Dispatch } from 'react';

export type CartCountContextType = {
  cartCount: number;
  setCartCount: Dispatch<React.SetStateAction<number>>;
};
