import { ProductType } from "../Product";

export type CartType = Pick<
  ProductType,
  | "id"
  | "name"
  | "price"
  | "imageUrl"
  | "quantity"
  | "maxQuantity"
  | "description"
>;
