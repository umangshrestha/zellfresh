import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddItemToCart } from '../../Cart/hooks/AddItemToCart/AddItemToCart.hooks';
import { useNotification } from '../../Notification';
import { PRODUCTS } from '../Product.queries';
import ProductList from '../ProductList';

export const ProductPage = () => {
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(PRODUCTS);
  const { addItemToCart } = useAddItemToCart();
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
      onAddItemToCart={addItemToCart}
      onEmptyStateClicked={() => navigate('/')}
    />
  );
};
