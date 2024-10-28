import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { DEFAULT_ADDRESS } from '../../config/address.ts';
import { AddressProps } from './Address.types.ts';

export const Address = ({
  apartmentNumber,
  street,
  zip,
  additionalInfo,
  onSave,
  onChange,
}: AddressProps) => (
  <FormGroup className="flex gap-4">
    <TextField
      label="Apartment Number"
      name="apartmentNumber"
      type="number"
      error={!!apartmentNumber && !Number.isInteger(apartmentNumber)}
      value={apartmentNumber || ''}
      onChange={(e) => onChange('apartmentNumber', e.target.value)}
      variant="outlined"
    />
    <TextField
      label="Street"
      name="street"
      value={street}
      error={!street}
      onChange={(e) => onChange('street', e.target.value)}
      variant="outlined"
      required
    />

    <TextField
      label="ZIP"
      name="zip"
      value={zip}
      variant="outlined"
      error={!zip}
      onChange={(e) => onChange('zip', e.target.value)}
      required
    />
    <div className="flex flex-wrap gap-4">
      <TextField
        label="City"
        name="city"
        defaultValue={DEFAULT_ADDRESS.city}
        variant="outlined"
        disabled
        required
      />
      <TextField
        label="State"
        name="state"
        defaultValue={DEFAULT_ADDRESS.state}
        disabled
        required
      />
      <TextField
        label="Country"
        name="country"
        defaultValue={DEFAULT_ADDRESS.country}
        variant="outlined"
        disabled
        required
      />
    </div>
    <TextField
      label="Additional Info"
      name="additionalInfo"
      value={additionalInfo}
      onChange={(e) => onChange('additionalInfo', e.target.value)}
      variant="outlined"
    />
    <Button variant="contained" color="primary" onClick={onSave}>
      Save
    </Button>
  </FormGroup>
);
