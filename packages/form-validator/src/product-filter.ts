import { z } from 'zod';
import { MAX_PRICE, ProductsList, ProductsSortByValues } from './config';

const booleanFromString = z
  .union([z.boolean(), z.string()])
  .transform((val) => val === true || val === 'true');

export const ProductFilterSchema = z
  .object({
    category: z.enum(ProductsList).optional(),
    maxPrice: z.coerce.number().int().positive().max(MAX_PRICE).optional(),
    minPrice: z.coerce.number().int().min(0).max(MAX_PRICE).optional(),
    maxRating: z.coerce.number().int().positive().max(5).optional(),
    minRating: z.coerce.number().int().min(0).max(5).optional(),
    name: z.string().trim().optional(),
    tags: z.array(z.string()).optional(),
    sortBy: z.enum(ProductsSortByValues).optional(),
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

export type ProductFilterType = z.infer<typeof ProductFilterSchema>;
