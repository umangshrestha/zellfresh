import { useMutation, useQuery } from '@apollo/client';
import { useNotification } from '../Notification';
import { ProductKey } from '../Product';
import { ADD_ITEM_TO_CART_MUTATION, CARTS_QUERY_VERBOSE } from './Cart.queries';

export const useCart = () => {
  const { setNotification } = useNotification();
  const { data, loading, error, previousData } = useQuery(CARTS_QUERY_VERBOSE);
  const [executeMutation] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [CARTS_QUERY_VERBOSE],
    onCompleted: () => {
      setNotification({
        message: 'Cart updated',
        severity: 'success',
      });
    },
  });
  const targetData = loading && previousData ? previousData : data;

  const getProductCount = ({ productId }: ProductKey) => {
    const items = targetData?.cart?.items?.filter(
      (item) => item.product?.productId === productId,
    );
    return items?.length ? items[0].quantity : 0;
  };

  const onAddItemToCart = (key: ProductKey, quantity: number) => {
    executeMutation({
      variables: {
        ...key,
        quantity,
      },
    }).then();
  };

  return {
    data: targetData,
    error: error,
    loading: loading && !previousData,
    onAddItemToCart,
    getProductCount,
  };
};
