import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/Cart';
import { CartEmptyPage } from '../../components/Cart/CartEmptyPage';
import CartList from '../../components/Cart/CartList';

export const CartPage = () => {
  const navigate = useNavigate();
  const { loading, data, checkoutDetails : {subTotal, enableCheckout}, ...functions } = useCart();

  if (!loading && !data?.length) {
    return <CartEmptyPage onClick={() => navigate('/')} />;
  }

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Cart Page</Typography>
      <CartList {...functions} loading={loading} data={data} />
      <Box className="flex  justify-end gap-4 pb-10">
        Sub total: <b>Rs. {subTotal}</b>
      </Box>
      <Button
        variant="contained"
        color="warning"
        className="w-full"
        disabled={!enableCheckout}
        onClick={() => navigate('/cart/checkout')}
      >
        Checkout
      </Button>
    </Box>
  );
};
