import type { Meta, StoryObj } from '@storybook/react';

import { ErrorComponent } from './ErrorComponent';

const meta = {
  title: 'ErrorComponent',
  component: ErrorComponent,
  tags: ['autodocs'],
  args: {},
} as Meta<typeof ErrorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No products available',
    description: [
      'There are no products available at the moment',
      'Please check back later',
    ],
    image: {
      url: '/images/empty-product.png',
      alt: 'No products available',
    },
    cta: {
      text: 'Refresh',
      to: '/',
      reloadDocument: false
    }
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'No products available',
    description: [
      'There are no products available at the moment',
      'Please check back later',
    ],
    cta: {
      text: 'Refresh',
      to: '/',
      reloadDocument: false
    }
  },
};

export const WithoutCta: Story = {
  args: {
    title: 'No products available',
    description: [
      'There are no products available at the moment',
      'Please check back later',
    ],
    image: {
      url: '/images/empty-product.png',
      alt: 'No products available',
    },
  },
};