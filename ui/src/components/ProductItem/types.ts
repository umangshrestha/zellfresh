export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
  maxQuantity: number;
  badgeText: string;
  tags: string[];
}
