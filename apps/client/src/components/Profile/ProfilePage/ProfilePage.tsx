import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Address from '../../Address';
import { useProfile } from '../Profile.hooks.tsx';

export const ProfilePage = () => {
  const { data, address, loading } = useProfile();
  if (loading) return <Typography variant="h1">Loading...</Typography>;
  return (
    <Box className="flex flex-col gap-4 max-w-xl mx-auto pt-3">
      <Typography variant="h4">Profile Page</Typography>
      <Address {...address} {...data} />
    </Box>
  );
};
