export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  quantity: number;
  category: string;
  maxQuantity: number;
  badgeText: string;
  tags: string[];
}

export type ProductProps = Pick<
  ProductType,
  | "name"
  | "description"
  | "price"
  | "imageUrl"
  | "quantity"
  | "rating"
  | "badgeText"
> & {
  onClick: () => void;
};
