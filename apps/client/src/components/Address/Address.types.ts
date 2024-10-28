import { Address } from '../../__generated__/types.ts';
type AddressKeys = 'apartmentNumber' | 'street' | 'zip' | 'additionalInfo';

export type AddressMutationFunction = {
  onSave: () => void;
  onChange: (key: AddressKeys, value: string | number) => void;
};

export type AddressType = Pick<Address, AddressKeys>;

export type AddressProps = AddressType & AddressMutationFunction;
