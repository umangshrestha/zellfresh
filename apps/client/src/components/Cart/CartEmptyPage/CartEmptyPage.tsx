import ErrorComponent, { ErrorComponentProps } from '../../ErrorComponent';

export const CartEmptyPage = ({
  onClick,
}: Pick<ErrorComponentProps, 'onClick'>) => (
  <ErrorComponent
    title="Your cart is empty"
    description={[
      'You have no items in your cart',
      'Start adding items to your cart by clicking the button below',
    ]}
    buttonText="Add items"
    image="/empty-cart.png"
    alt="Empty cart"
    onClick={onClick}
  />
);
