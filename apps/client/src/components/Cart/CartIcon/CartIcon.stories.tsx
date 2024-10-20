import type { Meta, StoryObj } from '@storybook/react';

const CartIconWithBackground = (props: CartIconProps) => (
  <div style={{ backgroundColor: 'gray' }}>
    <CartIcon {...props} />
  </div>
);

import { CartIcon } from './CartIcon';
import { CartIconProps } from './CartIcon.types';
const meta = {
  title: 'Cart/Icon',
  component: CartIconWithBackground,
  tags: ['autodocs'],
} as Meta<typeof CartIconWithBackground>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    count: 0,
    onClick: () => {},
  },
};
