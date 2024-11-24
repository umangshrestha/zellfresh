import type { Meta, StoryObj } from '@storybook/react';
import { CartIcon } from './CartIcon';

const meta = {
  title: 'Cart/Icon',
  component: (props) => (
    <div className="bg-black">
      <CartIcon {...props} />
    </div>
  ),
  tags: ['autodocs'],
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    cartCount: 0,
    onClick: () => {},
  },
};
