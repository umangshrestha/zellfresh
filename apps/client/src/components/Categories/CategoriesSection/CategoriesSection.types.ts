import type { Category } from '../../../__generated__/types';

export interface CategoriesSectionProps {
  categories: Omit<Category, '__typename'>[];
  onClick: (url: string) => void;
}
