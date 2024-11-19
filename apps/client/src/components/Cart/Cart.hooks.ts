import { useMutation, useQuery } from '@apollo/client';
import { useStorageStore } from '../../lib/store';
import { useNotification } from '../Notification';
import { ProductKey } from '../Product';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CARTS_QUERY_SIMPLE,
  CARTS_QUERY_VERBOSE,
} from './Cart.queries';
import { CartMutation } from './Cart.types.ts';

export const useCart = ({
  verbose = false,
}) => {
  const query = verbose ? CARTS_QUERY_VERBOSE : CARTS_QUERY_SIMPLE;
  const { setNotification } = useNotification();

  const userDetails = useStorageStore((state) => state.userDetails);
  const onError = (error: Error) => {
    setNotification({
      message: error.message,
      severity: 'error',
    });
  };
  const { data, loading } = useQuery(query, {
    fetchPolicy: userDetails ? 'cache-and-network' : 'no-cache',
    onError,
  });

  const [executeMutation] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [query],
    onError,
    onCompleted: () => {
      setNotification({
        message: 'Cart updated',
        severity: 'success',
      });
    },
  });

  const getProductCount = ({ productId }: ProductKey) => {
    const items = data?.cart?.items?.filter(
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
    data: (data?.cart?.items || []) as CartMutation['data'],
    checkoutDetails:  data?.cart?.checkoutDetails|| {
      subTotal: 0,
      enableCheckout: false,
    },
    loading,
    onAddItemToCart,
    getProductCount,
  };
};
