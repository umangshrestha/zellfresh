import { gql } from '@apollo/client';

export const CARTS_QUERY = gql`
  query {
    cart {
      count
      items {
        quantity
        product {
          productId
          name
          price
          imageUrl
          availableQuantity
          limitPerTransaction
          description
        }
      }
    }
  }
`;
