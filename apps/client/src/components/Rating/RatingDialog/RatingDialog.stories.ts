import type { Meta, StoryObj } from '@storybook/react';
import { RatingDialog } from './RatingDialog';

const meta = {
  title: 'RatingDialog',
  component: RatingDialog,
  tags: ['autodocs'],
} as Meta<typeof RatingDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentRating: 3,
    comment: 'This is a description',
  },
};

export const LastRating: Story = {
  args: {
    lastRating: 4,
    currentRating: 3,
    comment: 'This is a description',
  },
};
