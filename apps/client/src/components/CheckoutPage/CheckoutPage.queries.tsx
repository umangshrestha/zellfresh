import { gql } from '@apollo/client';

export const CHECKOUT_QUERY = gql`
  query {
    cart {
      items {
        quantity
        product {
          category
          name
          unit
          price
          imageUrl
        }
      }
    }
    me {
      address {
        apartmentNumber
        street
        zip
      }
    }
  }
`;
