import { useQuery } from '@apollo/client';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { CART_ITEM_QUERY } from '../../Cart/Cart.queries';
import { useNotification } from '../../Notification';
import { ProductAddItemProps } from './ProductAddItem.types';

export const ProductAddItem = ({
  productId,
  availableQuantity,
  limitPerTransaction,
  onAddItemToCart,
}: ProductAddItemProps) => {
  const { setNotification } = useNotification();
  const [quantity, setQuantity] = useState(0);

  const { data, loading, error } = useQuery(CART_ITEM_QUERY, {
    variables: {
      productId,
    },
  });

  useEffect(() => {
    if (data) {
      setQuantity(data.cartItem.quantity);
    }
  }, [data]);

  const onProductChange = (productId: string, quantity: number) => {
    onAddItemToCart(productId, quantity);
    setQuantity(quantity);
  };

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  return (
    <Select
      disabled={loading}
      value={quantity.toString()}
      onChange={(e) => onProductChange(productId, +e.target.value)}
      className="w-full h-12"
    >
      {Array.from(
        { length: Math.min(limitPerTransaction + 1, availableQuantity) },
        (_, i) => (
          <MenuItem key={i} value={i.toString()}>
            {i}
          </MenuItem>
        ),
      )}
    </Select>
  );
};
