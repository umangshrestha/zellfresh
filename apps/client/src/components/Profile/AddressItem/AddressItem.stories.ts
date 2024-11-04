import type { Meta, StoryObj } from '@storybook/react';
import { AddressItem } from './AddressItem';
import { AddressItemProps } from './AddressItem.types';

const meta = {
  title: 'Address/Item',
  component: AddressItem,
  tags: ['autodocs'],
} as Meta<AddressItemProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apt: '123',
    street: '123 Main St',
    zip: '12345',
  },
};

export const NotDefault: Story = {
  args: {
    street: '123 Main St',
    zip: '12345',
  },
};

export const Empty: Story = {
  args: {},
};
