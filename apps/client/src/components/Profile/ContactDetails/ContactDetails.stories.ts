import type { Meta, StoryObj } from '@storybook/react';
import { ContactDetails } from './ContactDetails';

const meta = {
  title: 'Profile/ContactDetails',
  component: ContactDetails,
  tags: ['autodocs'],
} as Meta<typeof ContactDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
