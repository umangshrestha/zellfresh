import Fingerprint from '@mui/icons-material/Fingerprint';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Notification, { useNotification } from '../../components/Notification';
import { login } from '../../lib/axios';
import { useStorageStore } from '../../lib/store';

export const LoginPage = () => {
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const setUserDetails = useStorageStore((state) => state.setUserDetails);

  const onError = () => {
    setNotification({
      message: 'Failed to sign in',
      severity: 'error',
    });
  };

  const onSuccess = () => {
    setUserDetails(null);
    navigate('/');
  };

  return (
    <Container maxWidth="xl">
      <Box
        mt={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
      >
        <Fingerprint color="primary" fontSize="large" />
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Sign in
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="textSecondary">
          Please sign in to continue
        </Typography>
        <Box mt={4}>
          <GoogleLogin
            useOneTap
            onSuccess={(response) => {
              if (response.credential)
                login('google', {
                  headers: {
                    Authorization: `Bearer ${response.credential}`,
                  },
                })
                  .then(onSuccess)
                  .catch(onError);
            }}
            onError={onError}
            type="standard"
            theme="filled_blue"
            text="signin_with"
            shape="pill"
          />
        </Box>
      </Box>
      <Notification />
      <Footer />
    </Container>
  );
};
