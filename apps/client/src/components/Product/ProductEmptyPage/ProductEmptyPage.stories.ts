import type { Meta, StoryObj } from '@storybook/react';
import { ProductEmptyPage } from './ProductEmptyPage';

const meta = {
  title: 'Product/EmptyPage',
  component: ProductEmptyPage,
  tags: ['autodocs'],
} as Meta<typeof ProductEmptyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
