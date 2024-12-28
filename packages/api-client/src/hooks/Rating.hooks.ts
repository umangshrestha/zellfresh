import { useMutation, useQuery } from '@apollo/client';
import { GET_RATING_QUERY, SUBMIT_FEEDBACK_MUTATION } from '../query';

export const useRating = (productId: string) => {
  const { data, error, loading } = useQuery(GET_RATING_QUERY, {
    variables: {
      productId,
    },
  });

  const [submitFeedback] = useMutation(SUBMIT_FEEDBACK_MUTATION, {
    refetchQueries: [
      {
        query: GET_RATING_QUERY,
        variables: {
          productId,
        },
      },
    ],
  });

  return {
    data,
    loading,
    error,
    onSubmitFeedback: (productId: string, rating: number, comment: string) =>
      submitFeedback({
        variables: {
          productId,
          rating,
          comment,
        },
      }),
  };
};
