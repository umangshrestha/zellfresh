import { gql } from '../../__generated__';

export const GET_RATING_QUERY = gql(`
query GetRating($productId: String!) {
  review(productId: $productId) {
    rating
    comment
  }
}`);

export const SUBMIT_FEEDBACK_MUTATION = gql(`
mutation SubmitFeedback($productId: String!, $rating: Float!, $comment: String!) {
  submitFeedback(productId: $productId, feedback: { rating: $rating, comment: $comment}) {
    rating
  }
}`);
