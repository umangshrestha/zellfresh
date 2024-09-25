import { useContext } from "react";
import { NotificationContext } from "./Notification.context";

export const useNotification = () => {
  return useContext(NotificationContext);
};
