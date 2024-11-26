import type { Meta, StoryObj } from '@storybook/react';
import { LoadingButton } from './LoadingButton';

export const LoadingButtonStory = (props: { loading: boolean }) => (
  <LoadingButton onClick={() => {}} loading={props.loading}>
    BUTTON
  </LoadingButton>
);

const meta = {
  title: 'button/LoadingButton',
  component: LoadingButtonStory,
  tags: ['autodocs'],
} as Meta<typeof LoadingButtonStory>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
