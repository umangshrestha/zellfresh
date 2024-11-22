import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { useNotification } from './Notification.hooks';

export const Notification = () => {
  const { notification, setNotification } = useNotification();
  if (!notification) {
    return <React.Fragment />;
  }

  return (
    <Snackbar
      open={true}
      autoHideDuration={notification.duration || 10000}
      onClose={() => setNotification(null)}
      anchorOrigin={{
        vertical: notification.verticalPosition || 'bottom',
        horizontal: notification.horizontalPosition || 'center',
      }}
    >
      <Alert severity={notification?.severity}>{notification?.message}</Alert>
    </Snackbar>
  );
};
