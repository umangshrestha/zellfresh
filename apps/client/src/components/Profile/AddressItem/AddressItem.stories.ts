import type { Meta, StoryObj } from '@storybook/react';
import { AddressItem } from './AddressItem';

const meta = {
  title: 'Address/Item',
  component: AddressItem,
  tags: ['autodocs'],
} as Meta<typeof AddressItem>;

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

export const Saving: Story = {
  args: {
    onAddressSaveLoading: true,
  },
};
