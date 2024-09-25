import { CartType } from "../Cart.types";

export type CartItemProps = CartType & {
  onChange: (id: string, count: number) => void;
  onRemove: (id: string) => void;
};
