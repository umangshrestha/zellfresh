import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query {
    products {
      items {
        productId
        name
        imageUrl
        description
        price
        unit
        availableQuantity
        limitPerTransaction
        category
        rating
        badgeText
        tags
      }
    }
  }
`;
