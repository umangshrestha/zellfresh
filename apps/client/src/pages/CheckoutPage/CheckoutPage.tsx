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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentMethod } from '../../__generated__/types.ts';
import { useNotification } from '../../components/Notification';
import { OrderItem } from '../../components/Order/OrderItem';
import OrderPlaced from '../../components/Order/OrderPlaced';
import { CHECKOUT_MUTATION, CHECKOUT_QUERY } from './CheckoutPage.queries.tsx';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
  const { data, loading, error } = useQuery(CHECKOUT_QUERY);
  const [checkoutMutation] = useMutation(CHECKOUT_MUTATION, {
    onCompleted: (data) => {
      const orderId = data.checkout.orderId;
      setNotification({
        message: `Order placed successfully with order ID: ${data.checkout.orderId}`,
        severity: 'success',
      });
      setOrderId(orderId);
      window.scrollTo(0, 0);
    },
  });

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

  if (orderId) {
    return <OrderPlaced orderId={orderId} />;
  }

  if (loading) return <CircularProgress />;

  if (error || !data || data.cart.items.length == 0) {
    navigate('/');
    return null;
  }

  const hasError =
    !data.cart?.checkoutDetails?.enableCheckout ||
    !data.me?.name ||
    !data.me?.email ||
    !data.me?.phone ||
    !data.me?.defaultAddress;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h5">Checkout Page</Typography>
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
          {data.cart.items.map(({ __typename, ...props }) => {
            let badgeText = props.product?.badgeText || '';
            if (!props.product?.availableQuantity) {
              badgeText = 'Unavailable';
            } else if (props.product.availableQuantity <= 0)
              badgeText = 'Out of Stock';
            else if (props.product.availableQuantity < 10)
              badgeText = 'Limited Stock';
            return (
              <ListItem key={`${__typename}_{props.product?.name}`}>
                <OrderItem
                  {...props}
                  price={props.product?.price || 0}
                  badgeText={badgeText}
                />
              </ListItem>
            );
          })}
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
                  {data.me?.name ? (
                    data.me.name
                  ) : (
                    <Typography color="error">No name found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>
                  {data.me?.email ? (
                    data.me.email
                  ) : (
                    <Typography color="error">No email found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>
                  {data.me?.phone ? (
                    data.me.phone
                  ) : (
                    <Typography color="error">No phone number found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>
                  {data.me?.defaultAddress ? (
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
        <Box className="flex justify-end gap-2 pb-4">
          <table className="table-fixed text-sm w-1/2">
            <tbody>
              <tr>
                <td>Sub Total</td>
                <td>Rs. {data.cart.checkoutDetails.subTotal || '0'}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>Rs. {data.cart.checkoutDetails.tax || '0'}</td>
              </tr>
              <tr>
                <td>Delivery</td>
                <td>Rs. {data.cart.checkoutDetails.deliveryPrice || '0'}</td>
              </tr>
              <tr className="border-t-2">
                <td>Total</td>
                <td>
                  <b>Rs. {data.cart.checkoutDetails.totalPrice || '0'}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </section>
      <Button
        variant="contained"
        color="error"
        className="w-full"
        disabled={data.cart.items.length === 0 || hasError}
        onClick={onPlaceOrder}
      >
        Place Order
      </Button>
    </Box>
  );
};
