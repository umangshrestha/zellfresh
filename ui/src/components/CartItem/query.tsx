import { client as sanityClient } from "@/sanity/lib/client";
import { ProductSchema, ProductType } from "./types";

const PRODUCTS_GORQ = `*[_type == "product" ] {
  name,
  description,
  price,
  imageUrl,
  quantity,
  category,
  tags
}`;

export const getAvailableCartItems = async (): Promise<ProductType[]> => {
  const products = await sanityClient.fetch(PRODUCTS_GORQ);
  return products.flatMap((product: object) => {
    const result = ProductSchema.safeParse(product);
    if (result.success) {
      return result.data satisfies ProductType;
    }
    return null;
  });
};
