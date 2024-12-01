import { useMutation, useQuery } from '@apollo/client';
import { useNotification } from '../Notification';
import {
  GET_RATING_QUERY,
  SUBMIT_FEEDBACK_MUTATION,
} from './Rating.queries.ts';

export const useRating = (productId: string) => {
  const { setNotification } = useNotification();
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
    onCompleted: () => {
      setNotification({
        message: 'Feedback submitted successfully',
        severity: 'success',
      });
    },
  });

  return {
    data,
    loading,
    error,
    onSubmitFeedback: (productId: string, rating: number, comment: string) => {
      submitFeedback({
        variables: {
          productId,
          rating,
          comment,
        },
      }).then();
    },
  };
};
