import type { Meta, StoryObj } from '@storybook/react';

import { ErrorComponent } from './ErrorComponent.tsx';

const meta = {
  title: 'EmptyPage',
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
    buttonText: 'Refresh',
    image: '/empty-product.png',
    alt: 'No products available',
    onClick: () => {},
  },
};
