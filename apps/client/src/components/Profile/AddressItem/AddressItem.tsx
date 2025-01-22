import LoadingButton from '@/components/LoadingButton';
import { useNotification } from '@/components/Notification';
import { DEFAULT_ADDRESS } from '@/config/address.ts';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { AddressSchema, AddressType } from '@repo/form-validator';
import { useState } from 'react';
import { ADDRESS_FIELDS_MAPPING } from './AddressItem.fields.ts';
import { AddressItemProps } from './AddressItem.types.ts';

export const AddressItem = ({
  addressId,
  apt,
  street,
  zip,
  onAddressSaveLoading,
  additionalInfo,
  onAddressSave,
}: AddressItemProps) => {
  const { setNotification } = useNotification();
  const [address, setAddress] = useState<AddressType>({
    apt,
    street,
    zip,
    additionalInfo,
    ...DEFAULT_ADDRESS,
  });

  const { success, error } = AddressSchema.safeParse(address);
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
                const name = nestedField.name as keyof AddressType;
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
        const name = field.name as keyof AddressType;
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
        onClick={() =>
          onAddressSave(address, addressId).then(() => {
            setNotification({
              message: 'Address updated successfully',
              severity: 'success',
            });
          })
        }
        disabled={!success}
      >
        Save
      </LoadingButton>
    </FormGroup>
  );
};
