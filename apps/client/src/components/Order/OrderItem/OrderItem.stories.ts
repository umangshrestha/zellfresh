import type { Meta, StoryObj } from '@storybook/react';
import { OrderItem } from './OrderItem';

const meta = {
  title: 'Order/Item',
  component: OrderItem,
  tags: ['autodocs'],
} as Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    productId: '1',
    price: 12.99,
    quantity: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU',
    name: 'Chicken Breast',
  },
};
