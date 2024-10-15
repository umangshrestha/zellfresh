import Fingerprint from '@mui/icons-material/Fingerprint';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { login } from '../../lib/axios';
import Footer from '../Footer';
import Notification from '../Notification';
import { useNotification } from '../Notification/Notification.hooks';

export const LoginPage = () => {
  const { setNotification } = useNotification();
  const navigate = useNavigate();

  const onError = () => {
    setNotification({
      message: 'Failed to sign in',
      severity: 'error',
    });
  };

  const onSuccess = () => {
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
              response.credential &&
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
