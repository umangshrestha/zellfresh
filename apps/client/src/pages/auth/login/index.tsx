import { GoogleLogin } from '@react-oauth/google';
import Typography from '@mui/material/Typography';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import type { CredentialResponse } from '@react-oauth/google';
import { useStorageStore } from '../../../lib/store';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../components/Notification/Notification.hooks';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  const login = useStorageStore((state) => state.login);

  const guestID = useStorageStore((state) => state.guestID);
  const onSuccess = (provider: string, response: CredentialResponse) => {
    const idToken = response.credential;
    if (!idToken) return;
    axios
      .get(`/api/auth/${provider}/login`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
          guestID,
        },
      })
      .then((response) => {
        const { access_token } = response.data;
        login(access_token);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setNotification({
          message: error.message,
          severity: 'error',
        });
      });
  };

  const onError = () => {
    setNotification({
      message: 'Failed to sign in',
      severity: 'error',
    });
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
            onSuccess={(response) => onSuccess('google', response)}
            onError={onError}
            type="standard"
            theme="filled_blue"
            text="signin_with"
            shape="pill"
          />
        </Box>
      </Box>
    </Container>
  );
}
