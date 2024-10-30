import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '..';
import { CartEmptyPage } from '../CartEmptyPage';
import { CartItemType } from '../CartItem';
import CartList from '../CartList';

export const CartPage = () => {
  const navigate = useNavigate();
  const { loading, data, ...functions } = useCart({
    verbose: true,
  });

  if (!loading && !data.length) {
    return <CartEmptyPage onClick={() => navigate('/')} />;
  }

  const totalPrice =
    data?.reduce(
      (acc: number, product: CartItemType) =>
        acc + product.price * product.availableQuantity,
      0,
    ) || 0;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <CartList {...functions} loading={loading} data={data} />
      <Box className="flex  justify-end gap-4 pb-10">
        Total: <b>{totalPrice}</b>
      </Box>
      <Button
        variant="contained"
        color="warning"
        className="w-full"
        onClick={() => navigate('/cart/checkout')}
      >
        Checkout
      </Button>
    </Box>
  );
};
