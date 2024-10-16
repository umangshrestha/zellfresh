import { useMutation } from '@apollo/client';
import { useNotification } from '../../../Notification';
import { useCartCount } from '../CartCount';
import { ADD_ITEM_TO_CART_MUTATION } from './AddItemToCart.queries';

export const useAddItemToCart = () => {
  const [executeMutation] = useMutation(ADD_ITEM_TO_CART_MUTATION);
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
    removeItemFromCart: (productId: string) => addItemToCart(productId, 0),
  };
};
