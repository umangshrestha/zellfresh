import type { Meta, StoryObj } from '@storybook/react';

import { OrderItemSkeleton } from './OrderItemSkeleton';

const meta = {
  title: 'Order/Skeleton',
  component: OrderItemSkeleton,
  tags: ['autodocs'],
} as Meta<typeof OrderItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
