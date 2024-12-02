import { useMutation, useQuery } from '@apollo/client';
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
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { PaymentMethod } from '../../../__generated__/types.ts';
import { CARTS_QUERY } from '../../Cart/Cart.queries.ts';
import LoadingButton from '../../LoadingButton';
import LoadingSpinner from '../../LoadingSpinner';
import OrderPlaced from '../../Order/OrderPlaced';
import { LIST_PRODUCTS_QUERY } from '../../Product/Product.queries.ts';
import { CHECKOUT_MUTATION, CHECKOUT_QUERY } from '../Checkout.queries.tsx';
import { CheckoutListSection } from '../CheckoutListSection/CheckoutListSection.tsx';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
  const { data, loading, error } = useQuery(CHECKOUT_QUERY);

  const [checkoutMutation, { loading: mutationLoading }] = useMutation(
    CHECKOUT_MUTATION,
    {
      refetchQueries: [{ query: CARTS_QUERY }, { query: LIST_PRODUCTS_QUERY }],
      onCompleted: (data) => {
        const orderId = data.checkout.orderId;
        setOrderId(orderId);
        window.scrollTo(0, 0);
      },
    },
  );

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
        onClick={onPlaceOrder}
      >
        Place Order
      </LoadingButton>
    </Box>
  );
};
