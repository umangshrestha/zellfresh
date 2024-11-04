import { z } from 'zod';
import { AddressItemSchema } from './AddressItem.schema.ts';

export type AddressItemType = z.infer<typeof AddressItemSchema> & {
  addressId: string;
};

export type AddressMutationFunction = {
  onAddressSave: (obj: AddressItemType) => void;
};

export type AddressItemProps = AddressItemType & AddressMutationFunction;
