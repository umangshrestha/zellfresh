import type { Meta, StoryObj } from '@storybook/react';
import { OrderEmptyPage } from './OrderEmptyPage';

const meta = {
  title: 'Order/EmptyPage',
  component: OrderEmptyPage,
  tags: ['autodocs'],
} as Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
