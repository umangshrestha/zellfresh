import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton } from './SplitButton';

const meta = {
  title: 'SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
} as Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        label: 'Add to Cart',
        value: 'primary',
      },
      {
        label: 'Add to Wishlist',
        value: 'secondary',
      },
    ],
    onClick: (val) => console.log(val),
  },
};
