import type { Meta, StoryObj } from '@storybook/react';
import { CartPage } from './CartPage';

const meta = {
  title: 'Cart/Page',
  component: CartPage,
  tags: ['autodocs'],
} as Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = {
  cart: {
    items: [
      {
        quantity: 4,
        productId: '1731039366725',
        product: {
          category: 'beef',
          name: 'Beef Chunk',
          unit: '500 gm',
          price: 10,
          imageUrl:
            'https://proteinfresh.in/wp-content/uploads/2020/06/Beef-Boneless-Fatless-Chunk-300x200.jpg',
          badgeText: '',
          availableQuantity: 5,
          limitPerTransaction: 10,
          description: 'Chunky boneless beef pieces, great for stews.',
        },
      },
    ],
    checkoutDetails: {
      subTotal: 40,
      enableCheckout: true,
    },
  },
};

export const Default: Story = {
  args: {
    data,
    loading: false,
    error: null,
  },
};
