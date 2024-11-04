import { MutationHookOptions, useMutation, useQuery } from '@apollo/client';
import { useNotification } from '../Notification';
import { AddressItemType } from './AddressItem';
import { ContactDetailsType } from './ContactDetails';
import {
  PROFILE_QUERY,
  PUT_ADDRESS_MUTATION,
  PUT_USER_MUTATION,
} from './Profile.queries.ts';

export const useProfile = () => {
  const { setNotification } = useNotification();
  const onError = (error: Error) => {
    setNotification({
      message: error.message,
      severity: 'error',
    });
  };

  const mutationOptions: MutationHookOptions = {
    refetchQueries: [PROFILE_QUERY],
    onError,
  };
  const { data, loading } = useQuery(PROFILE_QUERY, { onError });
  const [onAddressSave] = useMutation(PUT_ADDRESS_MUTATION, mutationOptions);
  const [onUserDetailsSave] = useMutation(PUT_USER_MUTATION, mutationOptions);
  return {
    loading,
    data: data?.me,
    onUserDetailsSave: (variables: ContactDetailsType) => {
      onUserDetailsSave({
        variables,
      }).then(() => {
        setNotification({
          message: 'Profile updated successfully',
          severity: 'success',
        });
      });
    },
    onAddressSave: (variables: AddressItemType) => {
      onAddressSave({
        variables,
      }).then(() => {
        setNotification({
          message: 'Address updated successfully',
          severity: 'success',
        });
      });
    },
  };
};
