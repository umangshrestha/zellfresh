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
      address(limit: 1) {
        apt
        street
        zip
      }
    }
  }
`;
