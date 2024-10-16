import { gql } from '@apollo/client';

export const CART_COUNT_QUERY = gql`
  query {
    cart {
      count
    }
  }
`;
