import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Address from '../Address';
import { ContactDetails } from '../ContactDetails';
import { useProfile } from './Profile.hooks.tsx';

export const ProfilePage = () => {
  const { me, onUserDetailsChange, address, onSave, onAddressChange, loading } =
    useProfile();
  if (loading) return <CircularProgress />;
  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Profile Page</Typography>
      <Typography variant="h6">Personal Information</Typography>
      <ContactDetails onUserDetailsChange={onUserDetailsChange} {...me} />
      <Typography variant="h6">Address</Typography>
      <Address {...address} onAddressChange={onAddressChange} />
      <Button variant="contained" color="primary" onClick={onSave}>
        Save
      </Button>
    </Box>
  );
};
