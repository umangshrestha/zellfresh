import { CartMutationFunctions } from '../../Cart';
import { ProductItemType } from '../ProductItem';

export type ProductListProps = {
  data: ProductItemType[];
  loading: boolean;
} & CartMutationFunctions;
