import { gql } from '@apollo/client';

export const CATEGORIES_QUERIES = gql`
  query {
    categories {
      name
      icon
      imageUrl
      navigateUrl
    }
  }
`;