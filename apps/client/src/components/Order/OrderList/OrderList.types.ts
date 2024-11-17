import {Order} from '../../../__generated__/types'
import {OrderItemType} from '../OrderItem';

export type OrderListType = Pick<
Order,
// | 'contactDetails'
 | 'createdAt'
 | 'deliveryStatus'
 | 'orderId'
// | 'paymentDetails'
 //| 'shippingAddress'
 | 'updatedAt'
> &{item: OrderItemType[]};

export type OrderListProps = OrderListType;