import type { Meta, StoryObj } from '@storybook/react';

import { EmptyPage } from './EmptyPage';

const meta = {
  title: 'EmptyPage',
  component: EmptyPage,
  tags: ['autodocs'],
  args: {},
} as Meta<typeof EmptyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
