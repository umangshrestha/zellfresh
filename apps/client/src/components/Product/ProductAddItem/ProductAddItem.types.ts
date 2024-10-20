import { CartMutationFunctions } from '../../Cart';
import { ProductProps } from '../ProductItem';

export type ProductAddItemProps = Pick<
  ProductProps,
  'productId' | 'availableQuantity' | 'limitPerTransaction'
> &
CartMutationFunctions;
