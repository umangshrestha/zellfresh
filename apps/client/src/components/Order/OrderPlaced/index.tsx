import React from 'react';
import CustomerExperienceRating from '../../Rating/CustomerExperienceRating';
import { useRating } from '../../Rating/Rating.hooks.ts';
import { OrderPlaced as OrderPlacedComponent } from './OrderPlaced.tsx';
import { OrderPlacedProps } from './OrderPlaced.types.ts';

const OrderPlaced = (props: Pick<OrderPlacedProps, 'orderId'>) => {
  const { data, onSubmitFeedback } = useRating(props.orderId);
  return (
    <React.Fragment>
      <OrderPlacedComponent {...props} />
      <CustomerExperienceRating
        rating={data?.review?.rating}
        onSubmitFeedback={(rating) =>
          onSubmitFeedback(props.orderId, rating, 'order placed')
        }
      />
    </React.Fragment>
  );
};

export default OrderPlaced;
