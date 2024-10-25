import { z } from 'zod';
import { SUPPORTED_PRODUCTS } from '../../../config/products';

const productList = SUPPORTED_PRODUCTS.map((x) => x.name);
const MAX_PRICE = 1000;
export const ProductFilterSchema = z
  .object({
    category: z.enum([productList[0], ...productList]).optional(),
    maxPrice: z.number().int().min(0).max(MAX_PRICE).optional(),
    minPrice: z.number().int().min(0).max(MAX_PRICE).optional(),
    maxRating: z.number().int().min(0).max(5).optional(),
    minRating: z.number().int().min(0).max(5).optional(),
    name: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
    sortBy: z.enum(['name', 'price', 'rating']).optional(),
    sortAsc: z.boolean().optional(),
  })
  .refine(({ minRating, maxRating, minPrice, maxPrice }) => {
    if (minRating && maxRating && minRating > maxRating) {
      return false;
    }
    if (minPrice && maxPrice && minPrice > maxPrice) {
      return false;
    }
    return true;
  });
