import type { Meta, StoryObj } from '@storybook/react';
import { ProductsEmptyPage } from './ProductsEmptyPage';

const meta = {
  title: 'Product/Page/Empty',
  component: ProductsEmptyPage,
  tags: ['autodocs'],
} as Meta<typeof ProductsEmptyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
