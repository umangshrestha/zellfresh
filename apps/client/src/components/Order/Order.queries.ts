import { gql } from '../../__generated__';

export const ORDER_QUERY = gql(`
  query ListOrders {
  orders {
    items {
      createdAt
      deliveryStatus
      orderId
      updatedAt
      shippingAddress {
        apt
        street
        city
        state
        country
        zip
        additionalInfo
      }
      items {
        quantity
        price
        product {
          productId
          name
          imageUrl
          description
          unit
          category
        }
      }
    }
  }
}`);
