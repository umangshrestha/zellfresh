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
