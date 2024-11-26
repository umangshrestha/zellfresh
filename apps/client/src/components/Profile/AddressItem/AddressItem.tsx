import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { DEFAULT_ADDRESS } from '../../../config/address.ts';
import LoadingButton from '../../LoadingButton';
import { ADDRESS_FIELDS_MAPPING } from './AddressItem.fields.ts';
import { AddressItemSchema } from './AddressItem.schema.ts';
import { AddressItemProps, AddressItemType } from './AddressItem.types.ts';

export const AddressItem = ({
  addressId,
  apt,
  street,
  zip,
  onAddressSaveLoading,
  additionalInfo,
  onAddressSave,
}: AddressItemProps) => {
  const [address, setAddress] = useState<AddressItemType>({
    addressId,
    apt,
    street,
    zip,
    additionalInfo,
    ...DEFAULT_ADDRESS,
  });

  const { success, error } = AddressItemSchema.safeParse(address);
  const errorsMap: Record<string, string> =
    error?.errors.reduce(
      (acc, curr) => {
        acc[curr.path[0]] = curr.message.toString();
        return acc;
      },
      {} as Record<string, string>,
    ) || {};
  return (
    <FormGroup className="flex gap-4">
      {ADDRESS_FIELDS_MAPPING.map((field) => {
        const name = field.name as keyof AddressItemType;
        const value = address[name] || '';
        const error = errorsMap[name];
        return (
          <TextField
            key={name}
            label={field.label}
            name={name}
            variant="outlined"
            required={field.required}
            disabled={field.disabled || onAddressSaveLoading}
            helperText={error}
            error={!!error}
            value={value}
            onChange={(e) => {
              setAddress({
                ...address,
                [name]: e.target.value,
              });
            }}
          />
        );
      })}
      <LoadingButton
        loading={onAddressSaveLoading}
        variant="contained"
        color="primary"
        onClick={() => onAddressSave(address)}
        disabled={!success}
      >
        Save
      </LoadingButton>
    </FormGroup>
  );
};
