import type { Meta, StoryObj } from '@storybook/react';
import { Address } from './Address';

const meta = {
  title: 'Address',
  component: Address,
  tags: ['autodocs'],
} as Meta<typeof Address>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
