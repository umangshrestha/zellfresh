import { gql } from '@apollo/client';

export const CARTS = gql`
  query {
    items {
      productId
      quantity
    }
  }
`;
