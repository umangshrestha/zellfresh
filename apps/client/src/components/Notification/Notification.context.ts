import { createContext } from 'react';
import type { NotificationContextType } from './Notification.types';

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
