import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { ContactDetailsSchema } from './ContactDetails.schema.ts';
import {
  ContactDetailsProps,
  ContactDetailsType,
} from './ContactDetails.types';

const FIELDS_MAPPING = [
  {
    label: 'Name',
    name: 'name',
    required: true,
    disabled: false,
  },
  {
    label: 'Email',
    name: 'email',
    required: true,
    disabled: true,
    helperText:
      'This email is used for sending notifications and not for login',
  },
  {
    label: 'Phone',
    name: 'phone',
    required: true,
    disabled: false,
  },
];

export const ContactDetails = ({
  email,
  phone,
  name,
  onSave,
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
      {FIELDS_MAPPING.map((field) => {
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
        onClick={() => onSave(userDetails)}
        disabled={!success}
      >
        Update
      </Button>
    </FormGroup>
  );
};
