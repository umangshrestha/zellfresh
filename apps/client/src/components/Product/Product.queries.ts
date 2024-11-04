import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query (
    $category: String
    $maxPrice: Float
    $minPrice: Float
    $maxRating: Float
    $minRating: Float
    $tags: [String!]
    $sortBy: String
    $sortAsc: Boolean
    $name: String
    $showOutOfStock: Boolean
  ) {
    products(
      category: $category
      maxPrice: $maxPrice
      minPrice: $minPrice
      maxRating: $maxRating
      minRating: $minRating
      tags: $tags
      sortBy: $sortBy
      sortAsc: $sortAsc
      name: $name
      showOutOfStock: $showOutOfStock
    ) {
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
      }
    }
  }
`;
