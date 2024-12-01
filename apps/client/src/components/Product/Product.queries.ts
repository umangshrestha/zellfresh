import { gql } from '../../__generated__';

export const LIST_PRODUCTS_QUERY = gql(`
query ListProducts(
  $category: String
  $maxPrice: Float
  $minPrice: Float
  $maxRating: Float
  $minRating: Float
  $tags: [String!]
  $sortBy: ProductsSortBy
  $sortAsc: Boolean
  $name: String
  $showOutOfStock: Boolean
  $cursor: String
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
    cursor: $cursor
  ) {
    pagination {
        next
    }
    items {
      productId
      name
      imageUrl
      description
      price
      unit
      availableQuantity
      category
      rating {
        rating
        count
      }
      badgeText
    }
  }
}`);

export const SUBMIT_PRODUCT_FEEDBACK_MUTATION = gql(`
mutation SubmitProductFeedback($productId: String!, $rating: Float!, $comment: String!) {
  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {
    rating
  }
}`);