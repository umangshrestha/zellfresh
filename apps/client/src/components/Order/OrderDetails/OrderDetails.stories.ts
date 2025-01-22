import { DeliveryStatus, PaymentMethod } from '@repo/api-client';
import type { Meta, StoryObj } from '@storybook/react';
import { OrderDetails } from './OrderDetails';

const meta = {
  title: 'Order/List',
  component: OrderDetails,
  tags: ['autodocs'],
} as Meta<typeof OrderDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const order: g.ListOrdersQuery['orders']['items'][0] = {
  orderId: 'b7235aa3-7bb0-4bf0-8d17-689591955d09',
  userId: '112579807565445456696',
  items: [
    {
      productId: '1731039366706',
      quantity: 5,
      price: 12.99,
      product: {
        name: 'Chicken Breast',
        imageUrl:
          'https://img.freepik.com/free-photo/raw-chicken-breasts-wooden-cutting-board_1150-13465.jpg?w=2000&t=st=1729380061~exp=1729380661~hmac=1bc3a1ebeac10780bae09c5027f223444a252464abbc51e08190f045fcad3163',
        price: 12.99,
        unit: '500 gm',
        __typename: 'Product',
      },
      __typename: 'OrderItem',
    },
  ],
  deliveryStatus: 'PENDING' as DeliveryStatus,
  shippingAddress: {
    apt: '',
    street: '511 Pelissier St',
    city: 'Bengaluru',
    state: 'Karnataka',
    zip: 'N9A 4L2',
    country: 'India',
    additionalInfo: '',
    __typename: 'Address',
  },
  paymentMethod: 'CASH' as PaymentMethod,
  contactDetails: {
    name: 'Umang Shrestha',
    phone: '2269611358',
    email: 'umangshrestha09@gmail.com',
    __typename: 'DeliveryContactDetails',
  },
  checkoutDetails: {
    totalPrice: 83.2,
    subTotal: 64.95,
    tax: 3.25,
    discount: 0,
    deliveryPrice: 15,
    taxPercentage: 0.05,
    __typename: 'CheckoutDetails',
  },
  createdAt: '2024-11-25T23:31:17.463Z',
  updatedAt: '2024-11-25T23:31:17.463Z',
  canCancel: true,
  __typename: 'Order',
};

export const Default: Story = {
  args: {
    data: order,
  },
};
