import type { Meta, StoryObj } from '@storybook/react';

import { ProductFilter } from './ProductFilter';

const meta = {
  title: 'ProductFilter',
  component: ProductFilter,
  tags: ['autodocs'],
  args: {},
} as Meta<typeof ProductFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productFilter: {
      sortBy: 'price',
      sortAsc: true,
      category: 'all',
      search: '',
    },
    updateProductFilter: (val: Record<string, string>) => console.log(val),
    resetProductFilter: () => console.log('reset'),
  },
};
