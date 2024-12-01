import type { Meta, StoryObj } from '@storybook/react';

import { AddItemToCartSkeleton } from './AddItemToCartSkeleton';

const meta = {
  title: 'AddItemToCart/Skeleton',
  component: AddItemToCartSkeleton,
  tags: ['autodocs'],
} as Meta<typeof AddItemToCartSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
