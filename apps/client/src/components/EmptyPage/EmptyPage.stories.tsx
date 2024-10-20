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

export const Default: Story = {
  args: {
    title: 'No products available',
    description: [
      'There are no products available at the moment',
      'Please check back later',
    ],
    buttonText: 'Refresh',
    image: '/public/empty-product.png',
    alt: 'No products available',
    onClick: () => {},
  },
};
