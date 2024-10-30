import type { Meta, StoryObj } from '@storybook/react';
import { CartItemReadOnly } from './CartItemReadOnly';

const meta = {
  title: 'Cart/Item/ReadOnly',
  component: CartItemReadOnly,
  tags: ['autodocs'],
} as Meta<typeof CartItemReadOnly>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 12.99,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU',
    availableQuantity: 10,
    name: 'Chicken Breast',
  },
};
