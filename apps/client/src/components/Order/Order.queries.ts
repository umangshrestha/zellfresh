import { gql } from '../../__generated__';

export const LIST_ORDERS_QUERY = gql(`
query ListOrders($cursor: String) {
 orders(cursor: $cursor) {
   items {
     orderId
     userId
     items {
       productId
       quantity
       price
       product {
         name
         imageUrl
         description
         price
         unit
       }
     }
     deliveryStatus
     shippingAddress {
       apt
       street
       city
       state
       zip
       country
       additionalInfo
     }
     paymentMethod
     contactDetails {
       name
       phone
       email
     }
     checkoutDetails {
       totalPrice
       subTotal
       tax
       discount
       deliveryPrice
       taxPercentage
     }
     createdAt
     updatedAt
     canCancel
   }
   pagination {
     next
   }
 }
}`);

export const CANCEL_ORDER_MUTATION = gql(`
mutation CancelOrder($orderId: String!) {
 cancelOrder(orderId: $orderId) {
   orderId
   deliveryStatus
 }
}`);
