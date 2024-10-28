import type { Meta, StoryObj } from '@storybook/react';
import { ProductEmptyPage } from './ProductEmptyPage';
import type { ProductEmptyPageProps } from './ProductEmptyPage.types';

const meta = {
  title: 'Product/EmptyPage',
  component: ProductEmptyPage,
  tags: ['autodocs'],
} as Meta<ProductEmptyPageProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};
