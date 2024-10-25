import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useCart } from '../Cart';
import { useNotification } from '../Notification';
import { PRODUCTS_QUERY } from './Product.queries';
import { useProductFilter } from './ProductFilter';

export const useProduct = () => {
  const { productFilter: variables, resetProductFilter } = useProductFilter();
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables,
  });
  const { onAddItemToCart, getProductCount } = useCart({ verbose: false });

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  return {
    loading,
    data: data?.products?.items || [],
    onAddItemToCart,
    getProductCount,
    onEmptyStateClicked: resetProductFilter,
  };
};
