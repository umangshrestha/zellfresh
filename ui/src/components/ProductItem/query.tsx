import { client as sanityClient } from "@/sanity/lib/client";
import { ProductSchema, ProductType } from "./types";

const PRODUCTS_GORQ = `*[_type == "product" && (!defined($category) || category == $category)] {
  _id,
  name,
  description,
  price,
  imageUrl,
  quantity,
  category,
  maxQuantity,
  badgeText,
  tags
}`;

export const getAvailableProducts = async (
  category: string | null,
): Promise<ProductType[]> => {
  const params = { category };
  const products = await sanityClient.fetch(PRODUCTS_GORQ, params);
  return products.flatMap((product: object) => {
    const result = ProductSchema.safeParse(product);
    if (result.success) {
      return result.data satisfies ProductType;
    }
    return null;
  });
};
