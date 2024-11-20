import type { Meta, StoryObj } from '@storybook/react';
import { ListOrdersQuery } from '../../../__generated__/graphql';
import { DeliveryStatus } from '../../../__generated__/types';
import { OrderList } from './OrderList';

const meta = {
  title: 'Order/List',
  component: OrderList,
  tags: ['autodocs'],
} as Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

const order: ListOrdersQuery['orders']['items'][0] = {
  createdAt: '2024-11-20T02:05:04.566Z',
  deliveryStatus: DeliveryStatus.Delivered,
  orderId: 'f2681f43-ed1d-4f61-91fe-48e14c5a03c3',
  updatedAt: '2024-11-20T02:05:04.566Z',
  shippingAddress: {
    apt: '',
    street: '511 Pelissier St',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    zip: 'N9A 4L2',
    additionalInfo: '',
    __typename: 'Address',
  },
  items: [
    {
      quantity: 7,
      price: 20.99,
      product: {
        productId: '1731039366723',
        name: 'Lamb Shoulder',
        imageUrl:
          'https://ux2cms.imgix.net/images/Smoked-Lamb-Shoulder-2.jpg?auto=compress,format&w=750',
        description: 'Tender lamb shoulder, great for slow cooking.',
        unit: '1 piece',
        category: 'mutton',
        __typename: 'Product',
      },
      __typename: 'OrderItem',
    },
  ],
  __typename: 'Order',
};

export const Default: Story = {
  args: {
    data: order,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    data: order,
    loading: true,
  },
};
