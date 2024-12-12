import { withCategoriesQuery } from './Categories.hoc';
import CategoriesCollapsableButton from './CategoriesCollapsableButton';
import CategoriesSection from './CategoriesSection';

const EnhancedCategoriesCollapsableButton = withCategoriesQuery(
  CategoriesCollapsableButton,
);
const EnhancedCategoriesSection = withCategoriesQuery(CategoriesSection);

export {
  EnhancedCategoriesCollapsableButton as CategoriesCollapsableButton,
  EnhancedCategoriesSection as CategoriesSection,
};
