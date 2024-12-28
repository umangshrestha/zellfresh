import { useMutation, useQuery } from '@apollo/client';
import { AddressType, ContactDetailsType } from '@repo/form-validator';
import {
  PROFILE_QUERY,
  PUT_ADDRESS_MUTATION,
  PUT_USER_MUTATION,
} from '../query';

export const useProfile = () => {
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
    },
    onUserDetailsSave: (variables: ContactDetailsType) =>
      onUserDetailsSave({ variables }),
    onAddressSave: (variables: AddressType, addressId?: string) =>
      onAddressSave({
        variables: {
          addressId,
          ...variables,
        },
      }),
  };
};
