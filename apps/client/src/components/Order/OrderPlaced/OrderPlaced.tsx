import ErrorComponent from '../../ErrorComponent';
import { OrderPlacedProps } from './OrderPlaced.types.ts';

export const OrderPlaced = ({ orderId }: OrderPlacedProps) => (
  <ErrorComponent
    title="Thank you for placing order"
    description={[
      'Your order number has been placed',
      'You can track your order in the order history page',
    ]}
    image={{
      url: '/images/thank-you-for-order.png',
      alt: 'thank you for placing order',
    }}
    cta={{
      text: `Order ID: ${orderId}`,
      to: `/order/${orderId}`,
    }}
  />
);
