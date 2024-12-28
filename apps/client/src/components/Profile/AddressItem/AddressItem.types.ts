import { AddressType } from '@repo/form-validator';

export type AddressMutationFunction = {
  onAddressSave: (obj: AddressType, addressId?: string) => Promise<object>;
  onAddressSaveLoading: boolean;
};

export type AddressItemProps = AddressType &
  AddressMutationFunction & {
    addressId?: string;
  };
