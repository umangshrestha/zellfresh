import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { DEFAULT_ADDRESS } from '../../config/address.ts';
import { useNotification } from '../Notification';
import {
  PROFILE_QUERY,
  PUT_ADDRESS_MUTATION,
  PUT_USER_MUTATION,
} from './Profile.queries.ts';

export const useProfile = () => {
  const { setNotification } = useNotification();
  const query = PROFILE_QUERY;
  const { data, loading, error } = useQuery(query);

  const [putAddressMutation] = useMutation(PUT_ADDRESS_MUTATION, {
    refetchQueries: [query],
  });
  const [putUserMutation] = useMutation(PUT_USER_MUTATION, {
    refetchQueries: [query],
  });

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  return {
    loading,
    data: data?.me,
    onUserDetailsSave: (variables: object) => {
      putUserMutation({ variables })
        .then(() => {
          setNotification({
            message: 'User Details Updated',
            severity: 'success',
          });
        })
        .catch((error) => {
          setNotification({
            message: error.message,
            severity: 'error',
          });
        });
    },
    onAddressSave: (variables: object) => {
      putAddressMutation({ variables: { ...variables, ...DEFAULT_ADDRESS } })
        .then(() => {
          setNotification({
            message: 'Address Updated',
            severity: 'success',
          });
        })
        .catch((error) => {
          setNotification({
            message: error.message,
            severity: 'error',
          });
        });
    },
  };
};
