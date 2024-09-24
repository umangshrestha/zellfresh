import { GoogleLogin } from "@react-oauth/google";
import Typography from "@mui/material/Typography";
import Fingerprint from "@mui/icons-material/Fingerprint";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import type { CredentialResponse } from "@react-oauth/google";
import { useStorageStore } from "../../../lib/store";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../components/Notification/hooks";

const VALIDATE_USER = gql`
  mutation {
    validateUser {
      email
    }
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [_, setNofication] = useNotification();

  const login = useStorageStore((state) => state.login);
  const [validateUser] = useMutation(VALIDATE_USER);

  const token = useStorageStore((state) => state.token);
  const provider = useStorageStore((state) => state.provider);

  const onSuccess = (newProvider: string, response: CredentialResponse) => {
    const idToken = response.credential;
    if (!idToken) return;

    const prevToken = token;
    const prevProvider = provider;

    login(newProvider, idToken);

    validateUser()
      .then(() => {
        console.log("User validated");
        navigate("/");
      })
      .catch((error) => {
        login(prevProvider, prevToken);
        setNofication({
          message: error.message,
          severity: "error",
        });
      });
  };

  const onError = () => {
    console.log("Error");
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
            onSuccess={(response) => onSuccess("google", response)}
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
