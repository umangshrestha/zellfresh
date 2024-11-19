import { gql } from '@apollo/client';

export const ORDERS_QUERY = gql`
  query OrdersQuery {
    orders {
      pagination {
        next
      }
      items {
        orderId
        items {
          productId
          quantity
          product {
            name
            price
            imageUrl
          }
        }
        deliveryStatus
        shippingAddress {
          addressId
          apt
          street
          city
          state
          zip
          country
        }
        contactDetails {
          name
          email
          phone
        }
        paymentMethod
        checkoutDetails {
          deliveryPrice
          subTotal
          tax
          totalPrice
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const ORDER_ITEM_QUERY = gql`
  query OrderItemQuery($orderId: String!) {
    order(orderId: $orderId) {
      orderId
      items {
        productId
        quantity
        product {
          name
          price
          imageUrl
        }
      }
      deliveryStatus
      shippingAddress {
        addressId
        apt
        street
        city
        state
        zip
        country
      }
      contactDetails {
        name
        email
        phone
      }
      paymentMethod
        checkoutDetails {
        deliveryPrice
        subTotal
        tax
        totalPrice
      }
      createdAt
      updatedAt
    }
  }
`;
