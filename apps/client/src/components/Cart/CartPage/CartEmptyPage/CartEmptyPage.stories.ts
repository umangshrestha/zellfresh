import type { Meta, StoryObj } from '@storybook/react';
import { CartEmptyPage } from './CartEmptyPage';

const meta = {
  title: 'Cart/Page/Empty',
  component: CartEmptyPage,
  tags: ['autodocs'],
} as Meta<typeof CartEmptyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
