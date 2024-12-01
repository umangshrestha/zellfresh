import { AlertColor } from '@mui/material/Alert';
import { Dispatch } from 'react';

export interface NotificationProps {
  severity: AlertColor;
  message: string;
  duration?: number;
  verticalPosition?: 'top' | 'bottom';
  horizontalPosition?: 'left' | 'center' | 'right';
}

export type NotificationContextType = {
  notification: NotificationProps | null;
  setNotification: Dispatch;
};
