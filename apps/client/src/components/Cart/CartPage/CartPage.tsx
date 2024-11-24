import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import ServerErrorComponent from '../../ServerErrorComponent';
import CartItem from '../CartItem';
import CartEmptyPage from './CartEmptyPage';
import CartLoadingPage from './CartLoadingPage';
import { CartPageProps } from './CartPage.types.ts';

export const CartPage = ({
  data,
  loading,
  error,
  ...functions
}: CartPageProps) => {
  if (loading) return <CartLoadingPage />;

  if (error) return <ServerErrorComponent error={error} />;

  if (!data || data.cart.items.length == 0) return <CartEmptyPage />;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h5">Cart Page</Typography>
      <List>
        {data.cart.items.map((item) => (
          <ListItem key={item.product?.productId}>
            <CartItem {...item} {...functions} />
          </ListItem>
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
