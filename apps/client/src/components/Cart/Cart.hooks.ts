import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNotification } from '../Notification';
import { ProductKey } from '../Product';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CARTS_QUERY_SIMPLE,
  CARTS_QUERY_VERBOSE,
} from './Cart.queries';
import { CartMutation } from './Cart.types';
import { useCartIcon } from './CartIcon';

export const useCart = ({ verbose = false }): CartMutation => {
  const query = verbose ? CARTS_QUERY_VERBOSE : CARTS_QUERY_SIMPLE;
  const { data, loading, error } = useQuery(query);
  const [executeMutation] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [query],
  });
  const { setNotification } = useNotification();
  const { setCartCount } = useCartIcon();

  const getProductCount = ({ productId }: ProductKey) => {
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

  useEffect(() => {
    if (data) {
      setCartCount(data.cart.count);
    }
  }, [data]);

  const onAddItemToCart = (key: ProductKey, quantity: number) => {
    executeMutation({
      variables: {
        ...key,
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
