import { useNotification } from '@/components/Notification';
import CustomerExperienceRating from '@/components/Rating/CustomerExperienceRating';
import { useRating } from '@repo/api-client';
import React from 'react';
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
