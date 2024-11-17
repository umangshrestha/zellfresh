import { CartItem, Product } from '../../../__generated__/types';


export type OrderItemType = Pick<
Product,
  | 'productId'
  | 'name'
  | 'price'
  | 'imageUrl'
  | 'description'
  | 'unit'
  | 'category'

    > &
    Pick<CartItem, 'quantity'>;

export type OderItemProps = OrderItemType ;
