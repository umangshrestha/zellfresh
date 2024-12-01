import type { Meta, StoryObj } from '@storybook/react';
import { CustomerExperienceRating } from './CustomerExperienceRating';

const meta = {
  title: 'RatingDialog',
  component: CustomerExperienceRating,
  tags: ['autodocs'],
} as Meta<typeof CustomerExperienceRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmitFeedback: () => {},
  },
};
