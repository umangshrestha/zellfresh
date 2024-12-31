import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '@repo/api-client';
import ServerErrorComponent from '../../ServerErrorComponent';
import CartItem from '../CartItem';
import CartEmptyPage from './CartEmptyPage';
import CartLoadingPage from './CartLoadingPage';

export const CartPage = ({
  data,
  loading,
  error,
  onClearCart,
  ...functions
}: ReturnType<typeof useCart>) => {
  if (loading) return <CartLoadingPage />;

  if (error) return <ServerErrorComponent error={error} />;

  if (!data || data.cart.items.length == 0) return <CartEmptyPage />;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h5">Cart Page</Typography>
      <div className="flex flex-row justify-end gap-4">
        <Button color="error" onClick={onClearCart}>
          Clear Cart
        </Button>
      </div>
      <List>
        {data.cart.items.map((item) => (
          <CartItem key={item.productId} {...item} {...functions} />
        ))}
      </List>
      <Box className="flex  justify-end gap-4 pb-10">
        Sub total: <b>Rs. {data.cart.checkoutDetails.subTotal}</b>
      </Box>
      <Button
        component={RouterLink}
        variant="contained"
        color="warning"
        className="w-full"
        disabled={!data.cart.checkoutDetails.enableCheckout}
        to={'/cart/checkout'}
      >
        Checkout
      </Button>
    </Box>
  );
};
