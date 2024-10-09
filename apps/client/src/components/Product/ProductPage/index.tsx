import { ProductPage } from './ProductPage';
import ErrorBoundary from '../../ErrorBoundary';

export default function ProductPageWithException() {
  return (
    <ErrorBoundary>
      <ProductPage />
    </ErrorBoundary>
  );
}
