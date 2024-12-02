import { useMutation, useQuery } from '@apollo/client';
import { useNotification } from '../Notification';
import { GET_RATING_QUERY } from '../Rating/Rating.queries.ts';
import {
  LIST_PRODUCTS_QUERY,
  SUBMIT_PRODUCT_FEEDBACK_MUTATION,
} from './Product.queries.ts';

export const useProductFeedback = (productId: string) => {
  const { setNotification } = useNotification();
  const { data, loading } = useQuery(GET_RATING_QUERY, {
    variables: {
      productId,
    },
  });
  const [submitProductFeedback] = useMutation(
    SUBMIT_PRODUCT_FEEDBACK_MUTATION,
    {
      refetchQueries: [{ query: LIST_PRODUCTS_QUERY }],
      onCompleted: () => {
        setNotification({
          message: 'Thank you for your feedback',
          severity: 'success',
        });
      },
    },
  );
  return {
    loading,
    lastRating: data?.review?.rating,
    comment: data?.review?.comment || '',
    submitFeedback: (rating: number, comment: string) => {
      submitProductFeedback({
        variables: {
          productId,
          rating,
          comment,
        },
      }).then();
    },
  };
};
