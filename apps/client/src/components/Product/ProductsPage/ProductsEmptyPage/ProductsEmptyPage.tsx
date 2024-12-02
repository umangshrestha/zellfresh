import ErrorComponent from '../../../ErrorComponent';
import { ProductEmptyPageProps } from './ProductsEmptyPage.types.ts';

export const ProductsEmptyPage = ({ category }: ProductEmptyPageProps) => (
  <ErrorComponent
    title="No products available"
    description={[
      'There are no products with the selected filters.',
      'Please try again with different filters.',
    ]}
    image={{
      url: '/images/empty-product.png',
      alt: 'No products',
    }}
    cta={{
      text: 'Reset Filters',
      to: category ? `/products?category=${category}` : '/products',
    }}
  />
);
