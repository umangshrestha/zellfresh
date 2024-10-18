import { AddItemToCartMutationFunction } from '../../Cart/hooks/AddItemToCart/AddItemToCart.types';
import { ProductProps } from '../ProductItem';

export type ProductAddItemProps = Pick<
  ProductProps,
  'productId' | 'availableQuantity' | 'limitPerTransaction'
> &
  AddItemToCartMutationFunction;
