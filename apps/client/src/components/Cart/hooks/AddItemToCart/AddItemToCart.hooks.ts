import { useMutation } from '@apollo/client';
import { useNotification } from '../../../Notification';
import { ADD_ITEM_TO_CART_MUTATION, CART_ITEM_QUERY } from '../../Cart.queries';
import { useCartCount } from '../CartCount';

export const useAddItemToCart = () => {
  const [executeMutation] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [CART_ITEM_QUERY],
  });
  const { setNotification } = useNotification();
  const { setCartCount } = useCartCount();

  const addItemToCart = (productId: string, quantity: number) => {
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
    addItemToCart,
  };
};
