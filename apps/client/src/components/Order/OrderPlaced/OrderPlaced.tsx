import ErrorComponent from '../../ErrorComponent';

export const OrderPlaced = (
  {
    orderId,
    onClick,
  }: Pick & {
    orderId: string;
  },
) => (
  <ErrorComponent
    title="Thank you for placing order"
    description={[
      'Your order number has been placed',
      'You can track your order in the order history page',
    ]}
    buttonText={`Order ID: ${orderId}`}
    image="/thank-you-for-order.png"
    alt="thank you for placing order"
    onClick={onClick}
  />
);
