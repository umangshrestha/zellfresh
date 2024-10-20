import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useCart } from '../../Cart/hooks/useCart';
import { useNotification } from '../../Notification';
import { PRODUCTS } from '../Product.queries';
import ProductList from '../ProductList';

export const ProductPage = () => {
  const { setNotification } = useNotification();
  const { data, loading, error, refetch } = useQuery(PRODUCTS);
  const { onAddItemToCart, getProductCount } = useCart({
    verbose: false,
  });

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  return (
    <ProductList
      loading={loading}
      data={data?.products?.items}
      onAddItemToCart={onAddItemToCart}
      getProductCount={getProductCount}
      onEmptyStateClicked={() => refetch()}
    />
  );
};
