import { AlertColor } from "@mui/material/Alert";
import { Dispatch } from "react";

export interface NotificationProps {
  severity: AlertColor;
  message: string;
}

export type NotificationContextType = {
  notification: NotificationProps | null;
  setNotification: Dispatch<React.SetStateAction<NotificationProps | null>>;
};

export type NotificationProviderProps = Readonly<{
  children: React.ReactNode;
}>;
