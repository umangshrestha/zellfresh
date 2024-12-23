import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CARTS_QUERY,
  CLEAR_CART_MUTATION,
} from '../query';

export const useCart = (onCompleted: () => void) => {
  const { data, loading, error, previousData } = useQuery(CARTS_QUERY);
  const [clearCart] = useMutation(CLEAR_CART_MUTATION, {
    refetchQueries: [CARTS_QUERY],
    onCompleted,
  });

  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [CARTS_QUERY],
    onCompleted,
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
    onAddItemToCart: (productId: string, quantity: number) =>
      addItemToCart({ variables: { productId, quantity } }),
  };
};
