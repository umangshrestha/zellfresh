import {Order} from '../../../__generated__/types'
import {OrderItemType} from '../OrderItem';

// export type OrderListType = Pick<
// Order,
// // | 'contactDetails'
//  | 'createdAt'
//  | 'deliveryStatus'
//  | 'orderId'
// // | 'paymentDetails'
//  //| 'shippingAddress'
//  | 'updatedAt'
// > &{items: OrderItemType[]};

export type OrderListType = Order;

export type OrderListProps = {data: OrderListType,
     loading: boolean};