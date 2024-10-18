import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Cart/hooks/useCart';
import { useNotification } from '../../Notification';
import { PRODUCTS } from '../Product.queries';
import ProductList from '../ProductList';

export const ProductPage = () => {
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(PRODUCTS);
  const { onAddItemToCart, getProductCount } = useCart();
  const navigate = useNavigate();

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
      data={data?.products?.items}
      loading={loading}
      onAddItemToCart={onAddItemToCart}
      getProductCount={getProductCount}
      onEmptyStateClicked={() => navigate('/')}
    />
  );
};
