import { z } from "zod";

export interface ProductType {
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
  tags: string[];
}

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  quantity: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
});
