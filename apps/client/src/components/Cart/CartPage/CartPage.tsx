import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNotification } from '../../Notification';
import CartList from '../CartList';
import { ADD_ITEM_TO_CART, CARTS } from './CartPage.queries';

export const CartPage = () => {
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(CARTS);
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);

  const onChange = (productId: string, quantity: number) => {
    addItemToCart({
      variables: {
        productId,
        quantity,
      },
    }).catch((error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    });
  };

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  const onRemove = (productId: string) => onChange(productId, 0);
  return (
    <CartList
      data={data?.products?.items}
      loading={loading}
      onRemove={onRemove}
      onChange={onChange}
    />
  );
};
