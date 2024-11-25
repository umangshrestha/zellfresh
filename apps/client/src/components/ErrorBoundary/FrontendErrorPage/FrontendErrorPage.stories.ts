import type { Meta, StoryObj } from '@storybook/react';
import { FrontendErrorPage } from './FrontendErrorPage';

const meta = {
  title: 'Error/Page/Frontend',
  component: FrontendErrorPage,
  tags: ['autodocs'],
} as Meta<typeof FrontendErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
