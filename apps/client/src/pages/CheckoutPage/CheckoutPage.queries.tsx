import { gql } from '@apollo/client';

export const CHECKOUT_QUERY = gql`
  query {
    cart {
      items {
        product {
          name
          price
          imageUrl
          availableQuantity
          description
          unit
          category
        }
      }
    }
    me {
      email
      name
      phone
      defaultAddress {
        apt
        street
        zip
      }
    }
  }
`;

export const CHECKOUT_MUTATION = gql`
  mutation ($paymentMethod: PaymentMethod!) {
    checkout(paymentMethod: $paymentMethod) {
      orderId
    }
  }
`;
