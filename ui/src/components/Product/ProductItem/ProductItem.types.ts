import { ProductType } from "../Product.types";
export type ProductItemType = Pick<
  ProductType,
  | "id"
  | "name"
  | "description"
  | "price"
  | "imageUrl"
  | "quantity"
  | "rating"
  | "badgeText"
>;

export type ProductProps = ProductItemType & {
  onClick: (id: string) => void;
};
