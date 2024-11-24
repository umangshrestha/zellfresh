import ErrorComponent from '../../ErrorComponent';

export const OrderEmptyPage = () => (
  <ErrorComponent
    title="You don't have any orders yet"
    description={[
      'You can add items to your cart by clicking the button below',
    ]}
    image={{
      url: '/images/empty-orders.png',
      alt: 'Empty order',
    }}
    cta={{
      to: '/',
      text: 'Go to Home',
    }}
  />
);
