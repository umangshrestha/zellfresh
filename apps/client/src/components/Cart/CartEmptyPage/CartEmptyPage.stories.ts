import type { Meta, StoryObj } from '@storybook/react';
import { CartEmptyPage } from './CartEmptyPage';
import type { CartEmptyPageProps } from './CartEmptyPage.types';

const meta = {
  title: 'Cart/EmptyPage',
  component: CartEmptyPage,
  tags: ['autodocs'],
} as Meta<CartEmptyPageProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
