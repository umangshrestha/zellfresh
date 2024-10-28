import ErrorComponent from '../../ErrorComponent';
import { ProductEmptyPageProps } from './ProductEmptyPage.types';

export const ProductEmptyPage = ({ onClick }: ProductEmptyPageProps) => (
  <ErrorComponent
    title="No products available"
    description={[
      'There are no products with the selected filters.',
      'Please try again with different filters.',
    ]}
    buttonText="Reset Filters"
    image="/empty-product.png"
    alt="No products available"
    onClick={onClick}
  />
);
