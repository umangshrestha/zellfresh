import { useAccount } from '@/components/Account';
import Notification, { useNotification } from '@/components/Notification';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';
import _ from 'lodash';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const { login, token } = useAccount();
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
        <Box
          mt="20px"
          minHeight="160px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          gap="10px"
        >
          <GoogleLogin
            useOneTap
            onSuccess={(response) => {
              if (response.credential)
                login(
                  'google',
                  {
                    headers: {
                      Authorization: `Bearer ${response.credential}`,
                      'x-guest-token':
                        token && _.has(token, 'guestToken')
                          ? (token.guestToken as string)
                          : undefined,
                    },
                  },
                  () => navigate('/'),
                ).then();
            }}
            onError={onError}
            type="standard"
            theme="filled_blue"
            text="signin_with"
            shape="pill"
            size="large"
          />
          <Link component={RouterLink} to="/" underline="always" ml="2">
            Continue as Guest
          </Link>
        </Box>
        <Typography variant="subtitle1" gutterBottom color="textSecondary">
          By signing in, you agree to our
          <Link component={RouterLink} to="/terms-and-conditions">
            Terms and Privacy
          </Link>{' '}
          Policy
        </Typography>
      </Box>
      <Notification />
    </Container>
  );
};
