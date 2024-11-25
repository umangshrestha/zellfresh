import ServerErrorComponent from '../../ServerErrorComponent';
import ProductItem from '../ProductItem';
import { ProductEmptyPage } from './ProductEmptyPage';
import ProductLoadingPage from './ProductLoadingPage';
import { ProductPageProps } from './ProductPage.types';

export const ProductPage = ({
  data,
  loading,
  error,
  ...mutationFunctions
}: ProductPageProps) => {
  if (loading) return <ProductLoadingPage />;

  if (error) return <ServerErrorComponent error={error} />;

  if (!data || data.products.items.length === 0) return <ProductEmptyPage />;

  return data.products.items.map((product) => (
    <ProductItem key={product.productId} {...product} {...mutationFunctions} />
  ));
};
