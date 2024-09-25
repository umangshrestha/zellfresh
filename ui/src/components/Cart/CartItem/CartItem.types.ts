import { ProductType } from "../../Product";

export type CartItemProps = Pick<
  ProductType,
  "name" | "price" | "imageUrl" | "quantity" | "maxQuantity" | "description"
> & {
  totalPrice: number;
  onChange: (count: number) => void;
  onRemove: () => void;
};
