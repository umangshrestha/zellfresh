import { useQuery } from '@apollo/client';
import { useCart } from '../Cart';
import { useNotification } from '../Notification';
import { PRODUCTS_QUERY } from './Product.queries';

export const useProduct = (variables: object) => {
  const { setNotification } = useNotification();
  const { data, loading } = useQuery(PRODUCTS_QUERY, {
    variables,
    onError: (error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    },
  });
  const { onAddItemToCart, getProductCount } = useCart({ verbose: false });

  return {
    loading,
    data: data?.products?.items || [],
    onAddItemToCart,
    getProductCount,
  };
};
