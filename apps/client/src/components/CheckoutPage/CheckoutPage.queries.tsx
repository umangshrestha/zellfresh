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
    addresses {
      apartmentNumber
      street
      zip
    }
    me {
      email
      name
      phone
    }
  }
`;
