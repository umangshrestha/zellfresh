import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, RadioButton } from '../../components/commonComponent/textInputForm';
import { useCheckout } from '@repo/api-client/src/hooks/Checkout.hooks';

enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'Card (Razorpay)',
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  street: string;
  zip: string;
  additionalInfo: string;
  selectedItems?: { name: string; quantity: number; price: number }[];
}

const PaymentPage = () => {
  const location = useLocation();
  const formData: FormData = location.state || {};
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [isRazorpayEnabled, setIsRazorpayEnabled] = useState(false);

  const { data, loading, error, onPlaceOrder, mutationLoading } = useCheckout(
    (response) => {
      const orderId = response.checkout.orderId;
      setOrderId(orderId);
      window.scrollTo(0, 0);
    }
  );
  const cartItems = data?.cart?.items || [];

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen -mt-[15%]">
        <h2 className="text-xl font-bold mb-4">No items selected for order.</h2>
        <Button type="theme" label="Go Back to Cart" onClick={() => navigate('/cart')} />
      </div>
    );
  }

  const handlePaymentChange = (method: PaymentMethod) => setPaymentMethod(method);

  const handlePlaceOrder = async () => {
    try {
      // @ts-ignore
      await onPlaceOrder({ items: formData.selectedItems, paymentMethod });
      navigate('/order-confirmation', { state: { orderDetails: { ...formData, paymentMethod, orderId } } });
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  if (loading || mutationLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while processing checkout.</div>;
  }

  // List of payment methods
  const paymentMethods = [
    { label: 'Cash', value: PaymentMethod.Cash },
    { label: 'Card (Razorpay)', value: PaymentMethod.CreditCard, disabled: !isRazorpayEnabled },
  ];

  return (
    <div className="checkout-page p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="selected-items mb-2 mx-[10%]">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-medium">Cart Items</h2>
            <Button type="casual" label="Edit" onClick={() => navigate('/cart')} />
          </div>
          <ul className="list-disc">
            {cartItems.map((item, index) => {
              const product = item.product;
              if (!product) return null;
              return (
                <li key={index} className="mb-4 flex items-center border-b py-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-md mr-4"
                  />
                  <div className="flex flex-col flex-grow">
                    <span className="font-semibold text-lg">{product.name}</span>
                    <p className="text-sm">{product.description}</p>
                    <p className="text-sm">{product.unit}</p>
                    <p className="text-md font-semibold">
                      Price: ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Payment Options */}
        <div className="payment-options mb-4">
          <div>
            <h2 className="text-xl font-medium">Payment Options</h2>
            <table className="table-fixed text-sm w-full">
              <tbody>
                <tr>
                  <td className="py-2">Sub total</td>
                  <td className="text-right py-2"> $ {data?.cart?.checkoutDetails?.subTotal || '0'}</td>
                </tr>
                <tr>
                  <td className="py-2">Tax</td>
                  <td className="text-right py-2"> $ {data?.cart?.checkoutDetails?.tax || '0'}</td>
                </tr>
                <tr>
                  <td className="py-2">Delivery</td>
                  <td className="text-right py-2"> $ {data?.cart?.checkoutDetails?.deliveryPrice || '0'}</td>
                </tr>
                <tr className="border-t-2">
                  <td className="py-2 font-semibold">Total</td>
                  <td className="text-right py-2 font-semibold"> $ {data?.cart?.checkoutDetails?.totalPrice || '0'}</td>
                </tr>
              </tbody>
            </table>
            <h2 className="font-medium text-[#494949]">Select Payment Method</h2>
            <div className="flex space-x-4 mb-4">
              {paymentMethods.map((method) => (
                <RadioButton
                  key={method.value}
                  name="paymentMethod"
                  value={method.value}
                  label={method.label}
                  checked={paymentMethod === method.value}
                  onChange={() => handlePaymentChange(method.value)}
                  disabled={method.disabled}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl flex justify-end mt-4">
        <Button type="theme" label="Place Order" onClick={handlePlaceOrder} />
      </div>
    </div>

  );
};

export default PaymentPage;
