import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { ContactDetailsSchema, ContactDetailsType } from '@repo/form-validator';
import { useState } from 'react';
import LoadingButton from '../../LoadingButton';
import { useNotification } from '../../Notification';
import { CONTACT_DETAILS_FIELDS_MAPPING } from './ContactDetails.fields.ts';
import { ContactDetailsProps } from './ContactDetails.types';

export const ContactDetails = ({
  email,
  phone,
  name,
  onUserSaveLoading,
  onUserDetailsSave,
}: ContactDetailsProps) => {
  const { setNotification } = useNotification();
  const [userDetails, setUserDetails] = useState<ContactDetailsType>({
    email,
    name,
    phone,
  });
  const { success, error } = ContactDetailsSchema.safeParse(userDetails);
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
      {CONTACT_DETAILS_FIELDS_MAPPING.map((field) => {
        const name = field.name as keyof ContactDetailsType;
        const value = userDetails[name] || '';
        const error = errorsMap[name];
        return (
          <TextField
            key={name}
            label={field.label}
            name={name}
            variant="outlined"
            required={field.required}
            disabled={field.disabled || onUserSaveLoading}
            helperText={field.helperText || error}
            error={!!error}
            value={value || ''}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                [field.name]: e.target.value,
              });
            }}
          />
        );
      })}
      <LoadingButton
        loading={onUserSaveLoading}
        variant="contained"
        color="primary"
        onClick={() =>
          onUserDetailsSave(userDetails).then(() => {
            setNotification({
              message: 'Profile updated successfully',
              severity: 'success',
            });
          })
        }
        disabled={!success}
      >
        Update
      </LoadingButton>
    </FormGroup>
  );
};
