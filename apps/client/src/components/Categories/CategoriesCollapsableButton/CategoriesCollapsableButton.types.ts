import { WithCategoriesProps } from '../Categories.types.ts';

export interface CategoriesCollapsableButtonProps extends WithCategoriesProps {
  onClick: (navigateUrl: string) => void;
  showText: boolean;
}
