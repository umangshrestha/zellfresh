import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { CONTACT_DETAILS_FIELDS_MAPPING } from './ContactDetails.fields.ts';
import { ContactDetailsSchema } from './ContactDetails.schema.ts';
import {
  ContactDetailsProps,
  ContactDetailsType,
} from './ContactDetails.types';

export const ContactDetails = ({
  email,
  phone,
  name,
  onUserDetailsSave,
}: ContactDetailsProps) => {
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
            disabled={field.disabled}
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => onUserDetailsSave(userDetails)}
        disabled={!success}
      >
        Update
      </Button>
    </FormGroup>
  );
};
