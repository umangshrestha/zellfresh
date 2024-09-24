import { AlertColor } from "@mui/material/Alert";
import { Dispatch } from "react";

export interface NotificationProps {
  severity: AlertColor;
  message: string;
}

export type NotificationContextType = [
  NotificationProps | null,
  Dispatch<React.SetStateAction<NotificationProps | null>>,
];
