import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNotification } from '../../../Notification';
import { ADD_ITEM_TO_CART_MUTATION, CARTS_QUERY } from '../../Cart.queries';
import { useCartCount } from '../CartCount';
import { UseCartMutation } from './useCart.types';

export const useCart = (): UseCartMutation => {
  const { data, loading, error } = useQuery(CARTS_QUERY);
  const [executeMutation] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [CARTS_QUERY],
  });
  const { setNotification } = useNotification();
  const { setCartCount } = useCartCount();

  const getProductCount = (productId: string) => {
    const items = data?.cart?.items?.filter(
      (item: any) => item.product.productId === productId,
    );
    return items?.length ? items[0].quantity : 0;
  };

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  const onAddItemToCart = (productId: string, quantity: number) => {
    executeMutation({
      variables: {
        productId,
        quantity,
      },
    })
      .then((response) => {
        setCartCount(response.data.addItemToCart.count);
        setNotification({
          message: 'Cart updated',
          severity: 'success',
        });
      })
      .catch((error) => {
        setNotification({
          message: error.message,
          severity: 'error',
        });
      });
  };

  return {
    data: data?.cart?.items?.map((item: any) => ({
      ...item.product,
      quantity: item.quantity,
    })),
    loading,
    onAddItemToCart,
    getProductCount,
  };
};
