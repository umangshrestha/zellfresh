import Fingerprint from '@mui/icons-material/Fingerprint';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Notification, { useNotification } from '../../components/Notification';
import { useAccount } from '../../components/Account';

export const LoginPage = () => {
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const {login} = useAccount();
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
                login('google', {
                  headers: {
                    Authorization: `Bearer ${response.credential}`,
                  },
                },
                () => navigate('/'),
                )
            }}
            onError={onError}
            type="standard"
            theme="filled_blue"
            text="signin_with"
            shape="pill"
            size="large"
          />
          <Link href="/" underline="always" ml="2">
            continue as guest
          </Link>
        </Box>
        <Typography variant="subtitle1" gutterBottom color="textSecondary">
          By signing in, you agree to our Terms and Privacy Policy
        </Typography>
      </Box>
      <Notification />
      <Footer />
    </Container>
  );
};
