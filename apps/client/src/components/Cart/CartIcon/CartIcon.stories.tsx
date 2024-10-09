import type { Meta, StoryObj } from '@storybook/react';

import { CartIcon } from './CartIcon';
const meta = {
  title: 'Cart/Icon',
  component: CartIcon,
  tags: ['autodocs'],
} as Meta<typeof CartIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    count: 0,
    onClick: () => {},
  },
};
