import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { Notification } from './Notification';
import { useNotification } from './Notification.hooks';
import { NotificationProps } from './Notification.types';

const NotificationWithProvider = ({ message, severity }: NotificationProps) => {
  const { setNotification } = useNotification();
  useEffect(() => {
    setNotification({
      message,
      severity,
    });
  }, [message, severity, setNotification]);

  return <Notification />;
};

const meta = {
  title: 'Notification',
  component: NotificationWithProvider,
  tags: ['autodocs'],
} as Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    message: 'Success message',
    severity: 'success',
  },
};

export const Error: Story = {
  args: {
    message: 'Error message',
    severity: 'error',
  },
};

export const Warning: Story = {
  args: {
    message: 'Warning message',
    severity: 'warning',
  },
};

export const Info: Story = {
  args: {
    message: 'Info message',
    severity: 'info',
  },
};
