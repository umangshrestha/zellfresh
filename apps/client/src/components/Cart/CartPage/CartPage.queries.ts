import { gql } from '@apollo/client';

export const CARTS_QUERY = gql`
  query {
    cart {
      count
      items {
        productId
        quantity
      }
    }
  }
`;
