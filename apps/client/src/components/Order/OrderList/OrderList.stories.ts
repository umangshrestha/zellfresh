import type { Meta, StoryObj } from '@storybook/react';
import { OrderItemType } from '../OrderItem/OrderItem.types';
import { OrderList } from './OrderList';
import { OrderListType } from './OrderList.types';
import { DeliveryStatus } from '../../../__generated__/types';

const meta = {
  title: 'Order/List',
  component: OrderList,
  tags: ['autodocs'],
} as Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

const products: OrderItemType[] = [
  {
    productId: '1',
    name: 'Chicken Breast',
    price: 12.99,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU',
    category: 'chicken',
    description: 'Delicious chicken breast',
    unit: 'kg',
  },
  {
    productId: '2',
    name: 'BONELESS PORK BUTT ROAST',
    price: 100,
    imageUrl:
      'https://132625588.cdn6.editmysite.com/uploads/1/3/2/6/132625588/s782101613657948031_p29_i2_w1920.jpeg?width=2400&optimize=medium',
    category: 'pork',
    description: 'Tasty pork butt roast',
    unit: 'kg',
  },
];

const order:OrderListType={
 createdAt:"10/23/2004",
 orderId:"111222",
 updatedAt:"10/23/2004",
 deliveryStatus: DeliveryStatus.Cancelled,
 item: products
}

export const Default: Story = {
  args: {
    ...order

  },
};


