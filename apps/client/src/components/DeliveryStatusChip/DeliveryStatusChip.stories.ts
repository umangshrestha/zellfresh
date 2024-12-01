import type { Meta, StoryObj } from '@storybook/react';

import { DeliveryStatusChip } from './DeliveryStatusChip';
import { DeliveryStatus } from '../../__generated__/types';

const meta = {
  title: 'DeliveryStatus/Chip',
  component: DeliveryStatusChip,
  tags: ['autodocs'],
  argTypes: {
    deliveryStatus: {
      options: Object.values(DeliveryStatus),
      mapping: Object.values(DeliveryStatus).reduce((acc, status) => {
        acc[status] = status;
        return acc;
      }, {}),
      control: {
        type: 'select',
        options: Object.values(DeliveryStatus),
      },
    },
  },
} as Meta<typeof DeliveryStatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Delivered: Story = {
  args: {
    deliveryStatus: DeliveryStatus.Delivered,
  },
};
export const Pending: Story = {
  args: {
    deliveryStatus: DeliveryStatus.Pending,
  },
};
export const Shipped: Story = {
  args: {
    deliveryStatus: DeliveryStatus.Shipped,
  },
};
export const Cancelled: Story = {
  args: {
    deliveryStatus: DeliveryStatus.Cancelled,
  },
};
export const Refunded: Story = {
  args: {
    deliveryStatus: DeliveryStatus.Refunded,
  },
};
export const Processing: Story = {
  args: {
    deliveryStatus: DeliveryStatus.Processing,
  },
};

