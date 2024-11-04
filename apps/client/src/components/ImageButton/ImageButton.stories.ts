import type { Meta, StoryObj } from '@storybook/react';
import ImageButton from './';

const meta = {
  title: 'ImageButton',
  component: ImageButton,
  tags: ['autodocs'],
} as Meta<typeof ImageButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    name: 'Product Name',
    imageUrl: 'https://via.placeholder.com/150',
  },
};
