import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ServerErrorComponent from '../../ServerErrorComponent';
import AddressItem from '../AddressItem';
import ContactDetails from '../ContactDetails';
import { useProfile } from '../index.ts';

export const ProfilePage = () => {
  const { data, address, error, onAddressSave, onUserDetailsSave, loading } =
    useProfile();

  if (loading) return <CircularProgress />;

  if (error) return <ServerErrorComponent error={error} />;

  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Profile Page</Typography>
      <Typography variant="h6">Personal Information</Typography>
      <ContactDetails {...data} onUserDetailsSave={onUserDetailsSave} />
      <Typography variant="h6">Address</Typography>
      <AddressItem {...address} onAddressSave={onAddressSave} />
    </Box>
  );
};
