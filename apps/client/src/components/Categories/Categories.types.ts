import { ListCategoriesQuery } from '@repo/api-client/dist/__generated__/graphql';

export interface WithCategoriesProps {
  categories: ListCategoriesQuery['categories'];
  navigateTo: (navigateUrl: string) => void;
}
