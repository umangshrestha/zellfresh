import type { Meta, StoryObj } from '@storybook/react';
import { OrderPlaced } from './OrderPlaced';

const meta = {
  title: 'Order/Placed',
  component: OrderPlaced,
  tags: ['autodocs'],
} as Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    orderId: '1234-1a2b-3c4d-5e6f',
    onClick: () => {},
  },
};
