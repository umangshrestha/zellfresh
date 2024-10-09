import ProductList from '../ProductList';
import { useQuery } from '@apollo/client';
import { PRODUCTS } from './ProductPage.queries';

export const ProductPage = () => {
  const { data, loading, error } = useQuery(PRODUCTS);
  return (
    <ProductList
      data={data?.products?.items}
      loading={loading}
      error={error}
      onAddToCart={() => {}}
    />
  );
};
