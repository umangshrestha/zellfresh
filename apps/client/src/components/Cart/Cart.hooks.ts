import { useMutation, useQuery } from '@apollo/client';
import { CartItem } from '../../__generated__/types.ts';
import { useStorageStore } from '../../lib/store';
import { useNotification } from '../Notification';
import { ProductKey } from '../Product';
import {
  ADD_ITEM_TO_CART_MUTATION,
  CARTS_QUERY_SIMPLE,
  CARTS_QUERY_VERBOSE,
} from './Cart.queries';
import { CartMutation } from './Cart.types';
import { CartItemType } from './CartItem';

export const useCart = ({
  verbose = false,
}): CartMutation & {
  enableCheckout: boolean;
  totalPrice: string;
} => {
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
      (item: CartItem) => item.product?.productId === productId,
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

  const cartItem =
    (data?.cart?.items?.map((item: CartItem) => ({
      ...item.product,
      quantity: item.quantity,
    })) as CartItemType[]) || [];

  const totalPrice = (
    cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0
  ).toFixed(2);

  const enableCheckout = cartItem.some((item) => item.availableQuantity > 0);
  return {
    data: cartItem,
    enableCheckout,
    totalPrice,
    loading,
    onAddItemToCart,
    getProductCount,
  };
};
