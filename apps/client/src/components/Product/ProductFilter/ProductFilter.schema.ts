import { z } from 'zod';
import { SUPPORTED_CATEGORIES } from '../../../config/categories';

const productList = SUPPORTED_CATEGORIES.map((x) => x.name);
const MAX_PRICE = 1000;

const booleanFromString = z
  .union([z.boolean(), z.string()])
  .transform((val) => val === true || val === 'true');

export const ProductFilterSchema = z
  .object({
    category: z.enum([productList[0], ...productList]).optional(),
    maxPrice: z.coerce.number().int().min(0).max(MAX_PRICE).optional(),
    minPrice: z.coerce.number().int().min(0).max(MAX_PRICE).optional(),
    maxRating: z.coerce.number().int().min(0).max(5).optional(),
    minRating: z.coerce.number().int().min(0).max(5).optional(),
    name: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
    sortBy: z.enum(['NAME', 'PRICE', 'RATING']).optional(),
    sortAsc: booleanFromString.optional(),
    showOutOfStock: booleanFromString.optional(),
  })
  .refine(({ minRating, maxRating, minPrice, maxPrice }) => {
    if (minRating && maxRating && minRating > maxRating) {
      return false;
    } else if (minPrice && maxPrice && minPrice > maxPrice) {
      return false;
    }
    return true;
  });
