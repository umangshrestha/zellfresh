import type { Meta, StoryObj } from '@storybook/react';

import { CartItemSkeleton } from './CartItemSkeleton';

const meta = {
  title: 'Cart/Skeleton',
  component: CartItemSkeleton,
  tags: ['autodocs'],
} as Meta<typeof CartItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
