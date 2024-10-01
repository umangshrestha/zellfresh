import type { Meta, StoryObj } from "@storybook/react";
import { CartList } from "./CartList";
import { CartType } from "../Cart.types";
import { ApolloError } from "@apollo/client";

const meta = {
  title: "Cart/List",
  component: CartList,
  tags: ["autodocs"],
} as Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

const products: CartType[] = [
  {
    id: "1",
    name: "Chicken Breast",
    price: 12.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU",
    availableQuantity: 10,
    limitPerTransaction: 10,
    description: "Delicious chicken breast",
  },
  {
    id: "2",
    name: "BONELESS PORK BUTT ROAST",
    price: 100,
    imageUrl:
      "https://132625588.cdn6.editmysite.com/uploads/1/3/2/6/132625588/s782101613657948031_p29_i2_w1920.jpeg?width=2400&optimize=medium",
    availableQuantity: 0,
    limitPerTransaction: 10,
    description: "Tasty pork butt roast",
  },
];

export const Default: Story = {
  args: {
    data: products,
    loading: false,
    error: undefined,
    onChange: () => {},
    onRemove: () => {},
  },
};

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
    error: undefined,
    onChange: () => {},
    onRemove: () => {},
  },
};

export const Error: Story = {
  args: {
    data: [],
    loading: false,
    error: new ApolloError({ errorMessage: "An error occurred" }),
    onChange: () => {},
    onRemove: () => {},
  },
};

export const Empty: Story = {
  args: {
    data: [],
    loading: false,
    error: undefined,
    onChange: () => {},
    onRemove: () => {},
  },
};
