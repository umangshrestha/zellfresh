import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { DEFAULT_ADDRESS } from '../../../config/address.ts';
import LoadingButton from '../../LoadingButton';
import { ADDRESS_FIELDS_MAPPING } from './AddressItem.fields.ts';
import { AddressItemSchema } from './AddressItem.schema.ts';
import {
  AddressItemProps,
  AddressItemType,
  AddressTypeKey,
} from './AddressItem.types.ts';

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
      {ADDRESS_FIELDS_MAPPING.map((field, i) => {
        if (field.nestedFields) {
          return (
            <div className="flex flex-row flex-wrap gap-4" key={`nested-${i}`}>
              {field.nestedFields.map((nestedField) => {
                const name = nestedField.name as AddressTypeKey;
                const value = address[name] || '';
                const error = errorsMap[name];
                return (
                  <TextField
                    style={{ width: nestedField.width }}
                    key={`nested-${name}`}
                    label={nestedField.label}
                    name={name}
                    variant="outlined"
                    required={nestedField.required}
                    disabled={nestedField.disabled || onAddressSaveLoading}
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
            </div>
          );
        }
        const name = field.name as AddressTypeKey;
        const value = address[name] || '';
        const error = errorsMap[name];
        return (
          <TextField
            key={`nonnested-${name}`}
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
        onClick={() => onAddressSave(address, addressId)}
        disabled={!success}
      >
        Save
      </LoadingButton>
    </FormGroup>
  );
};
