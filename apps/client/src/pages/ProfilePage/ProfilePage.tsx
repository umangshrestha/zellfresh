import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useProfile } from '../../components/Profile';
import AddressItem from '../../components/Profile/AddressItem';
import ContactDetails from '../../components/Profile/ContactDetails';

export const ProfilePage = () => {
  const { data, address, onAddressSave, onUserDetailsSave, loading } = useProfile();
  if (loading) return <CircularProgress />;
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
