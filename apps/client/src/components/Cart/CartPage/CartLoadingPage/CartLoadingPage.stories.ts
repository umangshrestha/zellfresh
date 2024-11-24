import type { Meta, StoryObj } from '@storybook/react';
import { CartLoadingPage } from './CartLoadingPage';

const meta = {
  title: 'Cart/Page/Loading',
  component: CartLoadingPage,
  tags: ['autodocs'],
} as Meta<typeof CartLoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
