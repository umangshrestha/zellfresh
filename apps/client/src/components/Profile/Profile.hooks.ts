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
  const { data, loading } = useQuery(PROFILE_QUERY);
  const [onAddressSave] = useMutation(PUT_ADDRESS_MUTATION, {
    refetchQueries: [PROFILE_QUERY],
  });
  const [onUserDetailsSave] = useMutation(PUT_USER_MUTATION, {
    refetchQueries: [PROFILE_QUERY],
  });
  return {
    loading,
    data: {
      name: data?.me?.name || '',
      email: data?.me?.email || '',
      phone: data?.me?.phone || '',
    },
    address: {
      addressId: data?.me?.address[0]?.addressId,
      street: data?.me?.address[0]?.street || '',
      zip: data?.me?.address[0]?.zip || '',
      apt: data?.me?.address[0]?.apt || '',
      additionalInfo: data?.me?.address[0]?.additionalInfo || '',
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
