import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHECKOUT_QUERY } from './CheckoutPage.queries.tsx';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { CartItemType } from '../../components/Cart/CartItem';
import CartItemReadOnly, {
  CartItemReadOnlyProps,
} from '../../components/Cart/CartItemReadOnly';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { data, loading } = useQuery(CHECKOUT_QUERY);

  useEffect(() => {
    if (!loading && data.cart.length == 0) {
      navigate('/');
    }
  }, [data, loading, navigate]);

  const handleRazorpayPayment = () => {
    // Integrate Razorpay API here
    console.log('Proceeding with Razorpay for card payment');
  };

  const onPlaceOrder = () => {
    console.log('Placing order');
  };

  if (loading) return <CircularProgress />;
  const cart = data.cart.items.map(
    (x: { product: CartItemReadOnlyProps }) => x.product,
  );

  const totalPrice =
    cart.reduce(
      (acc: number, product: CartItemType) =>
        acc + product.price * product.availableQuantity,
      0,
    ) || 0;

  const errors: string[] = [];
  if (!data.me.name) errors.push("Name can't be empty");
  if (!data.me.email) errors.push("Email can't be empty");
  if (!data.me.phone) errors.push("Phone can't be empty");
  if (!data.me.address) errors.push("Address can't be empty");
  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Checkout Page</Typography>
      <section>
        <div className="flex justify-between gap-4">
          <Typography variant="h6">Cart Items</Typography>
          <Button
            component={Link}
            href="/cart"
            underline="none"
            variant="outlined"
          >
            Edit
          </Button>
        </div>
        <List>
          {cart.map((product: CartItemReadOnlyProps) => (
            <ListItem key={product.name}>
              <CartItemReadOnly {...product} />
            </ListItem>
          ))}
        </List>
      </section>
      <section>
        <div className="flex justify-between gap-4">
          <Typography variant="h6">Delivery Information</Typography>
          <Button
            component={Link}
            href="/profile"
            underline="none"
            variant="outlined"
          >
            Edit
          </Button>
        </div>
        <TableContainer className="w-full">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{data.me.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{data.me.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{data.me.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Apt</TableCell>
                        <TableCell>{data.me.address[0].apt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Street</TableCell>
                        <TableCell>{data.me.address[0].street}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Zip</TableCell>
                        <TableCell>{data.me.address[0].zip}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <Divider />
      <section>
        <Typography variant="h6">Payment Options</Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Payment Method</FormLabel>
          <RadioGroup
            aria-label="payment-method"
            name="payment-method"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
          >
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Card (Razorpay)"
              disabled
            />
          </RadioGroup>

          {paymentMethod === 'card' && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleRazorpayPayment}
            >
              Pay with Razorpay
            </Button>
          )}
        </FormControl>
      </section>
      <section>
        <Box className="flex  justify-end gap-4 pb-10">
          Total: <b>{totalPrice}</b>
        </Box>
        <List>
          {errors.map((error) => (
            <ListItem key={error}>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </ListItem>
          ))}
        </List>
      </section>
      <Button
        variant="contained"
        color="error"
        className="w-full"
        disabled={cart.length === 0 || errors.length > 0}
        onClick={onPlaceOrder}
      >
        Place Order
      </Button>
    </Box>
  );
};
