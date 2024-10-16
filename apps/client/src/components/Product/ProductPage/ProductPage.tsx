import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAddItemToCart } from '../../Cart/hooks/AddItemToCart/AddItemToCart.hooks';
import { useNotification } from '../../Notification';
import ProductList from '../ProductList';
import { PRODUCTS } from './ProductPage.queries';

export const ProductPage = () => {
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(PRODUCTS);
  const { addItemToCart } = useAddItemToCart();

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
    />
  );
};
