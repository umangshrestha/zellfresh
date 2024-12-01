import type { Meta, StoryObj } from '@storybook/react';
import { ProductsLoadingPage } from './ProductsLoadingPage';

const meta = {
  title: 'Product/Page/Loading',
  component: ProductsLoadingPage,
  tags: ['autodocs'],
} as Meta<typeof ProductsLoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
