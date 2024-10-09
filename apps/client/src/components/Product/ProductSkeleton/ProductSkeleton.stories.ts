import type { Meta, StoryObj } from '@storybook/react';

import { ProductSkeleton } from './ProductSkeleton';

const meta = {
  title: 'Product/Skeleton',
  component: ProductSkeleton,
  tags: ['autodocs'],
} as Meta<typeof ProductSkeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
