import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { PaymentMethod } from '@repo/api-client';
import { useCheckout } from '@repo/api-client/src/hooks/Checkout.hooks.ts';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoadingButton from '../../LoadingButton';
import LoadingSpinner from '../../LoadingSpinner';
import OrderPlaced from '../../Order/OrderPlaced';
import { CheckoutListSection } from '../CheckoutListSection/CheckoutListSection.tsx';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
  const { data, loading, error, onPlaceOrder, mutationLoading } = useCheckout(
    (data) => {
      const orderId = data.checkout.orderId;
      setOrderId(orderId);
      window.scrollTo(0, 0);
    },
  );

  // ========================== Razorpay mehtod ==========================
  const createRazorpayOrder = async () => {
    if (!data || !data.cart || !data.cart.checkoutDetails) {
      throw new Error("Cart data is not available");
    }
    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: data.cart.checkoutDetails.totalPrice * 100,
          currency: 'INR',
        }),
      });
      const result = await response.json();
      return result.orderId;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  };

  if (orderId) {
    return <OrderPlaced orderId={orderId} />;
  }

  if (loading) return <LoadingSpinner />;

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

  const handleRazorpayPayment = () => {
    
  }

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h5">Checkout Page</Typography>
      <br />

      <CheckoutListSection cart={data.cart} />
      <section>
        <div className="flex justify-between gap-4">
          <Typography variant="h6">Delivery Information</Typography>
          <Button component={RouterLink} to="/profile" variant="outlined">
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
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <section>
        <div className="flex justify-between gap-4">
          <Typography variant="h6">Address Information</Typography>
          <Button component={RouterLink} to="/profile" variant="outlined">
            Edit
          </Button>
        </div>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>{data.me?.defaultAddress?.apt || '-'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Street</TableCell>
                <TableCell>
                  {data.me?.defaultAddress?.street ? (
                    data.me.defaultAddress.street
                  ) : (
                    <Typography color="error">No street found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Zip</TableCell>
                <TableCell>
                  {data.me?.defaultAddress?.zip ? (
                    data.me.defaultAddress.zip
                  ) : (
                    <Typography color="error">No zip found</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Additional Info</TableCell>
                <TableCell>
                  {data.me?.defaultAddress?.additionalInfo || '-'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <section className="flex flex-row justify-between gap-4">
        <Box>
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
        </Box>
        <table className="table-fixed text-sm w-1/3">
          <tbody>
            <tr>
              <td>Sub total</td>
              <td className="text-right">
                Rs. {data.cart.checkoutDetails.subTotal || '0'}
              </td>
            </tr>
            <tr>
              <td>Tax</td>
              <td className="text-right">
                Rs. {data.cart.checkoutDetails.tax || '0'}
              </td>
            </tr>
            <tr>
              <td>Delivery</td>
              <td className="text-right">
                Rs. {data.cart.checkoutDetails.deliveryPrice || '0'}
              </td>
            </tr>
            <tr className="border-t-2">
              <td>Total</td>
              <td className="text-right">
                <b>Rs. {data.cart.checkoutDetails.totalPrice || '0'}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <LoadingButton
        loading={mutationLoading}
        variant="contained"
        color="error"
        className="w-full"
        disabled={data.cart.items.length === 0 || hasError}
        onClick={() => onPlaceOrder(paymentMethod).then()}
      >
        Place Order
      </LoadingButton>
    </Box>
  );
};
