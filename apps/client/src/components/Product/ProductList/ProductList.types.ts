import { ProductItemType } from '../ProductItem';

export interface ProductListProps {
  data: ProductItemType[];
  loading: boolean;
  onAddItemToCart: (id: string, quantity: number) => void;
}
