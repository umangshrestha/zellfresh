import { CartType } from '../Cart.types';

export type CartItemProps = CartType & {
  onAddItemToCart: (id: string, count: number) => void;
  onRemove: (id: string) => void;
};
