import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { DEFAULT_ADDRESS } from '../../config/address.ts';
import {
  AddressMutationFunction,
  AddressType,
} from '../Address/Address.types.ts';
import { useNotification } from '../Notification';
import { ADDRESS_QUERY, PUT_ADDRESS_MUTATION } from './Profile.queries.ts';

export const useProfile = () => {
  const { setNotification } = useNotification();
  const { data, loading, error } = useQuery(ADDRESS_QUERY);
  const [executeMutation] = useMutation(PUT_ADDRESS_MUTATION, {
    refetchQueries: [ADDRESS_QUERY],
  });
  const [address, setAddress] = useState<AddressType>({} as AddressType);

  useEffect(() => {
    if (data?.me?.address) {
      setAddress(data.me.address);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setNotification({
        message: error.message,
        severity: 'error',
      });
    }
  }, [error, setNotification]);

  const addressMutationFunctions: AddressMutationFunction = {
    onChange: (key, value) => {
      const newAddress = {
        ...address,
        [key]: value,
      };
      setAddress(newAddress);
    },
    onSave: () => {
      executeMutation({ variables: { ...address, ...DEFAULT_ADDRESS } })
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
  return {
    loading,
    data: address,
    address: addressMutationFunctions,
  };
};
