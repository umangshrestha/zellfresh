import { Context, util } from "@aws-appsync/utils";
import { PutProductMutationVariables } from "../types/graphql";
import * as APITypes from "../types/graphql";

export function request(ctx: Context<PutProductMutationVariables>) {
  const product = ctx.args.product;
  const id = product.id || util.autoId();

  return {
    operation: "PutItem",
    key: { id },
    attributeValues: {
      id: { S: product.id },
      name: { S: product.name },
      price: { N: product.price.toString() },
      createdAt: { S: util.time.nowISO8601() },
      updatedAt: { S: util.time.nowISO8601() },
      description: { S: product.description },
      imageUrl: { S: product.imageUrl },
      category: { S: product.category },
      availableQuantity: { N: product.availableQuantity.toString() },
      limitPerTransaction: { N: product.limitPerTransaction.toString() },
      badgeText: { S: product.badgeText },
      tags: { L: product.tags.map((item) => ({ S: item })) },
      rating: { N: product.rating.toString() },
    },
  };
}

export function response(ctx: Context): APITypes.Product | null {
  if (!ctx.result || Object.keys(ctx.result).length === 0) {
    return null;
  }
  return ctx.result as APITypes.Product;
}
