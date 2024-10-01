import type { Meta, StoryObj } from "@storybook/react";
import { CartItem } from "./CartItem";

const meta = {
  title: "Cart",
  component: CartItem,
  tags: ["autodocs"],
} as Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
    price: 12.99,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXM1f7aFP4rKF-wJZ2juCb-7JcQCspEYUVwLK4JrpBdVtRB-ELAqpUCmkg6znfoG4fh8&usqp=CAU",
    availableQuantity: 10,
    limitPerTransaction: 10,
    name: "Chicken Breast",
    onChange: () => {},
    onRemove: () => {},
  },
};
