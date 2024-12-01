import { useState } from 'react';
import { LayoutProps as NotificationProviderProps } from '../Layout';
import { NotificationContext } from './Notification.context';
import {
  NotificationContextType,
  NotificationProps,
} from './Notification.types';

export const NotificationProvider = (
  { children }: NotificationProviderProps,
) => {
  const [notification, setNotification] = useState<NotificationProps | null>(
    null,
  );
  const contextValue: NotificationContextType = {
    notification,
    setNotification,
  };
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
