import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { ADD_ITEM_TO_CART } from '../../Cart/CartPage/CartPage.queries';
import { useNotification } from '../../Notification';
import ProductList from '../ProductList';
import { PRODUCTS } from './ProductPage.queries';

export const ProductPage = () => {
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(PRODUCTS);
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  const onAddToCart = (id: string, quantity: number) => {
    addItemToCart({
      variables: {
        productId: id,
        quantity,
      },
    }).catch((error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    });
  };

  return (
    <ProductList
      data={data?.products?.items}
      loading={loading}
      onAddToCart={onAddToCart}
    />
  );
};
