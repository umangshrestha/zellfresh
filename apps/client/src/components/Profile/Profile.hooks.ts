import { useMutation, useQuery } from '@apollo/client';
import { DEFAULT_ADDRESS } from '../../config/address.ts';
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
  const { data, loading, error } = useQuery(PROFILE_QUERY);
  const [onAddressSave, { loading: onAddressSaveLoading }] = useMutation(
    PUT_ADDRESS_MUTATION,
    {
      refetchQueries: [PROFILE_QUERY],
    },
  );
  const [onUserDetailsSave, { loading: onUserSaveLoading }] = useMutation(
    PUT_USER_MUTATION,
    {
      refetchQueries: [PROFILE_QUERY],
    },
  );
  return {
    loading,
    onAddressSaveLoading,
    onUserSaveLoading,
    error,
    data: {
      name: data?.me?.name || '',
      email: data?.me?.email || '',
      phone: data?.me?.phone || '',
    },
    address: {
      apt: data?.me?.defaultAddress?.apt || '',
      street: data?.me?.defaultAddress?.street || '',
      zip: data?.me?.defaultAddress?.zip || '',
      additionalInfo: data?.me?.defaultAddress?.additionalInfo || '',
      ...DEFAULT_ADDRESS,
    },
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
    onAddressSave: (variables: AddressItemType, addressId?: string) => {
      onAddressSave({
        variables: {
          addressId,
          ...variables,
        },
      }).then(() => {
        setNotification({
          message: 'Address updated successfully',
          severity: 'success',
        });
      });
    },
  };
};
