import { useMutation, useQuery } from '@apollo/client';
import {
  GET_RATING_QUERY,
  LIST_PRODUCTS_QUERY,
  SUBMIT_PRODUCT_FEEDBACK_MUTATION,
} from '../query';

export const useProductFeedback = (
  productId: string,
  onCompleted: () => void,
) => {
  const { data, loading } = useQuery(GET_RATING_QUERY, {
    variables: {
      productId,
    },
  });
  const [submitProductFeedback] = useMutation(
    SUBMIT_PRODUCT_FEEDBACK_MUTATION,
    {
      refetchQueries: [{ query: LIST_PRODUCTS_QUERY }],
      onCompleted,
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
