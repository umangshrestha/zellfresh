import { ProductItemType } from '../ProductItem';

export interface ProductListProps {
  data: ProductItemType[];
  loading: boolean;
  onAddToCart: (id: string, quantity: number) => void;
}
