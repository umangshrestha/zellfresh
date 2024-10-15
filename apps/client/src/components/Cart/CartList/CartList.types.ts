import { CartType } from '../Cart.types';

export interface CartListProps {
  data: CartType[];
  loading: boolean;
  onRemove: (id: string) => void;
  onChange: (id: string, quantity: number) => void;
}
