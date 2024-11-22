import { gql } from '../../__generated__';

export const LIST_CATEGORIES_QUERY = gql(`
query ListCategories {
  categories {
    name
    icon
    imageUrl
    navigateUrl
    isAvailable
  }
}`);
