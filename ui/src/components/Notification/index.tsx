import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNotification } from "./hooks";

const Notification = () => {
  const [notification, setNotification] = useNotification();
  const duration = 5000; // Set the desired duration
  return (
    <Snackbar
      open={notification !== null}
      autoHideDuration={duration}
      onClose={() => setNotification(null)}
    >
      <Alert severity={notification?.severity}>{notification?.message}</Alert>
    </Snackbar>
  );
};

export default Notification;
