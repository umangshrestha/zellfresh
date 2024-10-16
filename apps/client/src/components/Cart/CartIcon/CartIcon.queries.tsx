import { gql } from '@apollo/client';

export const COUNT_QUERY = gql`
  query {
    cart {
      count
    }
  }
`;

export const COUNT_SUBSCRIPTION = gql`
  subscription {
    cartCountUpdated
  }
`;
