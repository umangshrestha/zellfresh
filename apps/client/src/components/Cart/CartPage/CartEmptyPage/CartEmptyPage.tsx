import ErrorComponent from '@/components/ErrorComponent';

export const CartEmptyPage = () => (
  <ErrorComponent
    title="Your cart is empty"
    description={[
      'You have no items in your cart',
      'Start adding items to your cart by clicking the button below',
    ]}
    image={{
      url: '/images/empty-cart.png',
      alt: 'Empty cart',
    }}
    cta={{
      text: 'Start shopping',
      to: '/',
    }}
  />
);
