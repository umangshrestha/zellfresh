import CategoriesCollapsableButton from './CategoriesCollapsableButton';
import CategoriesSection from './CategoriesSection';
import { withCategoriesQuery } from './WithCategories';

const EnhancedCategoriesCollapsableButton = withCategoriesQuery(CategoriesCollapsableButton);
const EnhancedCategoriesSection = withCategoriesQuery(CategoriesSection);

export {
  EnhancedCategoriesCollapsableButton as CollapsableButton,
  EnhancedCategoriesSection as Section,
};