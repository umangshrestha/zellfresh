import { useMutation, useQuery } from '@apollo/client';
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
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentMethod } from '../../__generated__/types.ts';
import { CartItemType } from '../../components/Cart/CartItem';
import CartItemReadOnly, {
  CartItemReadOnlyProps,
} from '../../components/Cart/CartItemReadOnly';
import { useNotification } from '../../components/Notification';
import { CHECKOUT_MUTATION, CHECKOUT_QUERY } from './CheckoutPage.queries.tsx';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
  const { data, loading } = useQuery(CHECKOUT_QUERY, {
    onError: (error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    },
  });
  const [checkoutMutation] = useMutation(CHECKOUT_MUTATION, {
    onCompleted: (data) => {
      const orderId = data.checkout.orderId;
      setNotification({
        message: `Order placed successfully with order ID: ${data.checkout.orderId}`,
        severity: 'success',
      });
      navigate(`/orders/placed/${orderId}`);
    },
    onError: (error) => {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    },
  });

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
    checkoutMutation({
      variables: {
        paymentMethod,
      },
    }).then();
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

  const hasError =
    !data.me.name ||
    !data.me.email ||
    !data.me.phone ||
    !data.me.defaultAddress;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Checkout Page</Typography>
      <br />
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
                <TableCell>
                  {data.me.name ? (
                    data.me.name
                  ) : (
                    <Typography color="error">No name found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>
                  {data.me.email ? (
                    data.me.email
                  ) : (
                    <Typography color="error">No email found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>
                  {data.me.phone ? (
                    data.me.phone
                  ) : (
                    <Typography color="error">No phone number found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>
                  {data.me.defaultAddress ? (
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Apt</TableCell>
                          <TableCell>{data.me.defaultAddress.apt}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Street</TableCell>
                          <TableCell>{data.me.defaultAddress.street}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Zip</TableCell>
                          <TableCell>{data.me.defaultAddress.zip}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography color="error">No address found</Typography>
                  )}
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
            onChange={(event) =>
              setPaymentMethod(event.target.value as PaymentMethod)
            }
          >
            <FormControlLabel
              value={PaymentMethod.Cash}
              control={<Radio />}
              label="Cash"
            />
            <FormControlLabel
              value={PaymentMethod.Card}
              control={<Radio />}
              label="Card (Razorpay)"
              disabled
            />
          </RadioGroup>

          {paymentMethod === PaymentMethod.Card && (
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
      </section>
      <Button
        variant="contained"
        color="error"
        className="w-full"
        disabled={cart.length === 0 || hasError}
        onClick={onPlaceOrder}
      >
        Place Order
      </Button>
    </Box>
  );
};
