import type { ListProductsQuery } from '../../../__generated__/graphql.ts';
import { CartMutationFunctions } from '../../Cart';

export type ProductItemType = ListProductsQuery['products']['items'][0];

export type RatingMutation = {
  onRatingClick: (productId: string, rating: number) => void;
};

export type ProductProps = ProductItemType &
  CartMutationFunctions &
  RatingMutation;
