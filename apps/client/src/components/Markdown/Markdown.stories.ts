import type { Meta, StoryObj } from '@storybook/react';

import { Markdown } from './Markdown';

const meta = {
  title: 'MarkdownComponent',
  component: Markdown,
  tags: ['autodocs'],
} as Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Data: Story = {
  args: {
    data: `
# Terms and Conditions   
Please read these terms and conditions carefully before using Our Service.

## Interpretation and Definitions
* Interpretation
* Definitions 
`,
    loading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    data: '',
    loading: true,
    error: null,
  },
};

export const Error: Story = {
  args: {
    data: '',
    loading: false,
    error: {
      name: 'Error',
      message: 'Error message',
    },
  },
};
