import { useState } from "react";
import { NotificationProps } from "./types";
import { NotificationContext } from "./context";

export const NotificationProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [notificaiton, setNotification] = useState<NotificationProps | null>(
    null,
  );

  return (
    <NotificationContext.Provider value={[notificaiton, setNotification]}>
      {children}
    </NotificationContext.Provider>
  );
};
