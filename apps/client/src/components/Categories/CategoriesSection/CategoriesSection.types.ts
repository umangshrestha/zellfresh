import { WithCategoriesProps } from '../Categories.types.ts';

export interface CategoriesSectionProps extends WithCategoriesProps {
  onClick: (navigateUrl: string) => void;
}
