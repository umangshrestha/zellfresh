import { g } from '@repo/api-client';

export interface WithCategoriesProps {
  categories: g.ListCategoriesQuery['categories'];
  navigateTo: (navigateUrl: string) => void;
}
