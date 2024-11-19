import type { Meta, StoryObj } from '@storybook/react';
import { CartItemType } from '../CartItem/CartItem.types';
import { CartList } from './CartList';
import { CartMutation, CartMutationFunctions } from '../Cart.types';

const meta = {
  title: 'Cart/List',
  component: CartList,
  tags: ['autodocs'],
} as Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

const products: CartMutation['data'] = [
  {
    product: {
      productId: '1',
      name: 'Chicken Breast',
      price: 12.99,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU',
      availableQuantity: 10,
      limitPerTransaction: 10,
      category: 'chicken',
      description: 'Delicious chicken breast',
      unit: 'kg',
    },
    quantity: 1,
  },
  {
    product: {
      productId: '2',
      name: 'BONELESS PORK BUTT ROAST',
      price: 100,
      imageUrl:
        'https://132625588.cdn6.editmysite.com/uploads/1/3/2/6/132625588/s782101613657948031_p29_i2_w1920.jpeg?width=2400&optimize=medium',
      availableQuantity: 0,
      category: 'pork',
      limitPerTransaction: 10,
      description: 'Tasty pork butt roast',
      unit: 'kg',
    },
    quantity: 1,
  },
];

export const Default: Story = {
  args: {
    data: products,
    loading: false,
    onAddItemToCart: () => {},
    getProductCount: () => 0,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
    onAddItemToCart: () => {},
    getProductCount: () => 0,
  },
};
