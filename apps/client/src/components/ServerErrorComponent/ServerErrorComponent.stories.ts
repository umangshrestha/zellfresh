import type { Meta, StoryObj } from '@storybook/react';
import { ServerErrorComponent } from './ServerErrorComponent';

const meta = {
  title: 'ServerErrorPage',
  component: ServerErrorComponent,
  tags: ['autodocs'],
} as Meta<typeof ServerErrorComponent>

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: []
  }
};
