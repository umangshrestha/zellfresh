import type { Meta, StoryObj } from '@storybook/react';

import { AddItemToCart } from './AddItemToCart';

const meta = {
  title: 'AddItemToCart',
  component: AddItemToCart,
  tags: ['autodocs'],
} as Meta<typeof AddItemToCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productId: '1',
    quantity: 1,
    product: {
      name: 'Product 1',
      unit: 'unit',
      description: 'Description',
      price: 1000,
      imageUrl: 'https://via.placeholder.com/150',
      limitPerTransaction: 10,
      availableQuantity: 100,
    },
    onAddItemToCart: () => {},
    onClose: () => {},
  },
};

export const Error = {
  args: {
    loading: false,
    error: true,
    data: {
      cartItem: {
        quantity: 1,
      },
      product: {
        name: 'Product 1',
        price: 1000,
        imageUrl: 'https://via.placeholder.com/150',
        limitPerTransaction: 10,
        availableQuantity: 100,
      },
    },
  },
};
