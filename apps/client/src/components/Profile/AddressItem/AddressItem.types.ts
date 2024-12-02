import { z } from 'zod';
import { AddressItemSchema } from './AddressItem.schema.ts';

export type AddressItemType = z.infer<typeof AddressItemSchema>;

export type AddressTypeKey = keyof AddressItemType;
export type AddressMutationFunction = {
  onAddressSave: (obj: AddressItemType, addressId?: string) => void;
  onAddressSaveLoading: boolean;
};

export type AddressItemProps = AddressItemType &
  AddressMutationFunction & {
    addressId?: string;
  };
