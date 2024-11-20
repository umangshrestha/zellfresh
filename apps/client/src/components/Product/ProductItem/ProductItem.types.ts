import type { ListProductsQuery } from '../../../__generated__/graphql.ts';
import { CartMutationFunctions } from '../../Cart';

export type ProductItemType = ListProductsQuery['products']['items'][0];

export type ProductProps = ProductItemType & CartMutationFunctions;
