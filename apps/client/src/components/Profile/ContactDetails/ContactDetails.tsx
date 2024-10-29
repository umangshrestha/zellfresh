import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { ContactDetailsProps } from './ContactDetails.types';

export const ContactDetails = ({
  email,
  phone,
  name,
  onUserDetailsChange,
}: ContactDetailsProps) => (
  <FormGroup className="flex gap-4">
    <TextField
      label="Name"
      name="name"
      value={name}
      onChange={(e) => onUserDetailsChange('name', e.target.value)}
      variant="outlined"
      required
    />
    <TextField
      label="Email"
      name="email"
      value={email}
      onChange={(e) => onUserDetailsChange('email', e.target.value)}
      variant="outlined"
      required
    />
    <TextField
      label="Phone"
      name="phone"
      value={phone}
      onChange={(e) => onUserDetailsChange('phone', e.target.value)}
      variant="outlined"
      required
    />
  </FormGroup>
);
