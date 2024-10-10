import { gql } from '@apollo/client';

export const COUNT_QUERY = gql`
  query {
    cart {
      count
    }
  }
`;
