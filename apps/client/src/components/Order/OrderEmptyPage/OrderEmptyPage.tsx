import ErrorComponent, { ErrorComponentProps } from '../../ErrorComponent';

export const OrderEmptyPage = ({
  onClick,
}: Pick<ErrorComponentProps, 'onClick'>) => (
  <ErrorComponent
    title="You don't have any orders yet"
    description={[
      'You can add items to your cart by clicking the button below',
    ]}
    buttonText="Add items"
    image="/empty-orders.png"
    alt="Empty order"
    onClick={onClick}
  />
);
