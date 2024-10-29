import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart';
import { CartItemType } from '../Cart/CartItem';
import CartList from '../Cart/CartList';
import Address from '../Profile/Address';
import { ContactDetails } from '../Profile/ContactDetails';
import { useProfile } from '../Profile/Profile.hooks.tsx';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const {
    me,
    address,
    onSave,
    onUserDetailsChange,
    onAddressChange,
    loading: addressLoading,
  } = useProfile();
  const {
    data: cart,
    loading,
    ...mutationFunction
  } = useCart({ verbose: true });

  useEffect(() => {
    if (!loading && !cart.length) {
      navigate('/');
    }
  }, [cart, loading, navigate]);

  const handleRazorpayPayment = () => {
    // Integrate Razorpay API here
    console.log('Proceeding with Razorpay for card payment');
  };

  const onPlaceOrder = () => {
    onSave();
  };

  if (addressLoading || loading) return <CircularProgress />;
  const totalPrice =
    cart?.reduce(
      (acc: number, product: CartItemType) =>
        acc + product.price * product.availableQuantity,
      0,
    ) || 0;
  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Checkout Page</Typography>
      <CartList data={cart} loading={loading} {...mutationFunction} />
      <Divider />
      <Typography variant="h6">Personal Information</Typography>
      <ContactDetails onUserDetailsChange={onUserDetailsChange} {...me} />
      <Typography variant="h6">Delivery Address</Typography>
      <Address {...address} onAddressChange={onAddressChange} />
      <Divider />
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
      <Box className="flex  justify-end gap-4 pb-10">
        Total: <b>{totalPrice}</b>
      </Box>
      <Button
        variant="contained"
        color="error"
        className="w-full"
        onClick={onPlaceOrder}
      >
        Place Order
      </Button>
    </Box>
  );
};
