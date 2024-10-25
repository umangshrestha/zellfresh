import type { Meta, StoryObj } from '@storybook/react';
import { ProductItemType } from '../ProductItem';
import { ProductList } from './ProductList';

const meta = {
  title: 'Product/List',
  component: ProductList,
  tags: ['autodocs'],
} as Meta<typeof ProductList>;

export default meta;
type Story = StoryObj<typeof meta>;

const products: ProductItemType[] = [
  {
    productId: '1',
    name: 'Chicken Breast',
    price: 12.99,
    limitPerTransaction: 5,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU',
    availableQuantity: 10,
    rating: 4.5,
    category: 'chicken',
    badgeText: '',
    description: 'Delicious chicken breast',
    unit: '1 lb',
  },
  {
    productId: '2',
    name: 'BONELESS PORK BUTT ROAST',
    price: 100,
    limitPerTransaction: 2,
    imageUrl:
      'https://132625588.cdn6.editmysite.com/uploads/1/3/2/6/132625588/s782101613657948031_p29_i2_w1920.jpeg?width=2400&optimize=medium',
    availableQuantity: 0,
    rating: 3.5,
    category: 'pork',
    badgeText: 'New',
    description: 'Tasty pork butt roast',
    unit: '1 lb',
  },
];

export const Default: Story = {
  args: {
    data: products,
    loading: false,
    onAddItemToCart: () => {},
  },
};

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
    onAddItemToCart: () => {},
  },
};

export const Empty: Story = {
  args: {
    data: [],
    loading: false,
    onAddItemToCart: () => {},
  },
};
