import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { DEFAULT_ADDRESS } from '../../../config/address.ts';
import { useNotification } from '../../Notification';
import {
  AddressMutationFunction,
  AddressType,
} from '../Address/Address.types.ts';
import {
  ContactDetailsMutationFunction,
  ContactDetailsType,
} from '../ContactDetails/ContactDetails.types.ts';
import { ADDRESS_QUERY, PUT_ADDRESS_MUTATION } from './Profile.queries.ts';

export const useProfile = () => {
  const { setNotification } = useNotification();
  const query = ADDRESS_QUERY;
  const { data, loading, error } = useQuery(query);
  const [executeMutation] = useMutation(PUT_ADDRESS_MUTATION, {
    refetchQueries: [query],
  });
  const [address, setAddress] = useState<AddressType>({} as AddressType);
  const [me, setMe] = useState<ContactDetailsType>({
    email: '',
    name: '',
    phone: '',
  });

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

  const onAddressChange: AddressMutationFunction['onAddressChange'] = (
    key,
    value,
  ) => {
    const newAddress = {
      ...address,
      [key]: value,
    };
    setAddress(newAddress);
  };

  const onUserDetailsChange: ContactDetailsMutationFunction['onUserDetailsChange'] =
    (key, value) => {
      const newMe = {
        ...me,
        [key]: value,
      };
      setMe(newMe);
    };

  return {
    loading,
    address,
    me,
    onUserDetailsChange,
    onAddressChange,
    onSave: () => {
      executeMutation({ variables: { ...address, ...DEFAULT_ADDRESS, ...me } })
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
