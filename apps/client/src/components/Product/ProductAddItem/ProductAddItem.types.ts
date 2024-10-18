import { UseCartMutationFunctions } from '../../Cart/hooks/useCart';
import { ProductProps } from '../ProductItem';

export type ProductAddItemProps = Pick<
  ProductProps,
  'productId' | 'availableQuantity' | 'limitPerTransaction'
> &
  UseCartMutationFunctions;
