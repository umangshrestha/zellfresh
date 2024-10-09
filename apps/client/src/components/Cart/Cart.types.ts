import { Product } from '../../types/graphql';

export type CartType = Pick<
  Product,
  | 'id'
  | 'name'
  | 'price'
  | 'imageUrl'
  | 'availableQuantity'
  | 'limitPerTransaction'
  | 'description'
>;
