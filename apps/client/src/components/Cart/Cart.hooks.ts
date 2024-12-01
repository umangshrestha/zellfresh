import { useMutation, useQuery } from '@apollo/client';
import { useNotification } from '../Notification';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CARTS_QUERY,
  CLEAR_CART_MUTATION,
} from './Cart.queries';

export const useCart = () => {
  const { setNotification } = useNotification();
  const { data, loading, error, previousData } = useQuery(CARTS_QUERY);
  const [clearCart] = useMutation(CLEAR_CART_MUTATION, {
    refetchQueries: [CARTS_QUERY],
    onCompleted: () => {
      setNotification({
        message: 'Cart updated',
        severity: 'success',
      });
    },
  });

  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [CARTS_QUERY],
    onCompleted: () => {
      setNotification({
        message: 'Cart updated',
        severity: 'success',
      });
    },
  });

  const targetData = loading && previousData ? previousData : data;

  const getCartItem = (productId: string) => {
    const items = targetData?.cart?.items?.filter(
      (item) => item.productId === productId,
    );
    return items?.length ? items[0] : null;
  };

  return {
    data: targetData,
    error,
    loading: loading && !previousData,
    getCartItem,
    onClearCart: () => clearCart().then(),
    onAddItemToCart: (productId: string, quantity: number) => {
      addItemToCart({ variables: { productId, quantity } }).then()
    },
  };
};
