import type { Meta, StoryObj } from '@storybook/react';
import { ProductLoadingPage } from './ProductLoadingPage';

const meta = {
  title: 'Product/Page/Loading',
  component: ProductLoadingPage,
  tags: ['autodocs'],
} as Meta<typeof ProductLoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
