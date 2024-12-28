import { useRating } from '@repo/api-client';
import React from 'react';
import { useNotification } from '../../Notification';
import CustomerExperienceRating from '../../Rating/CustomerExperienceRating';
import { OrderPlaced as OrderPlacedComponent } from './OrderPlaced.tsx';
import { OrderPlacedProps } from './OrderPlaced.types.ts';

const OrderPlaced = (props: Pick<OrderPlacedProps, 'orderId'>) => {
  const { setNotification } = useNotification();
  const { data, onSubmitFeedback } = useRating(props.orderId);
  return (
    <React.Fragment>
      <OrderPlacedComponent {...props} />
      <CustomerExperienceRating
        rating={data?.review?.rating}
        onSubmitFeedback={(rating) =>
          onSubmitFeedback(props.orderId, rating, 'order placed').then(() =>
            setNotification({
              message: 'Thank you for your feedback',
              severity: 'success',
            }),
          )
        }
      />
    </React.Fragment>
  );
};

export default OrderPlaced;
