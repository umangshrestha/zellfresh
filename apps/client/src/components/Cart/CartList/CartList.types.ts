import { CartType } from '../Cart.types';

export interface CartListProps {
  data: CartType[];
  loading: boolean;
  onRemove: (id: string) => void;
  onAddItemToCart: (id: string, quantity: number) => void;
}
