import { Context, util } from "@aws-appsync/utils";
import { AddProductMutationVariables } from "../types/graphql";

export function request(ctx: Context<AddProductMutationVariables>) {
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

export function response(ctx: Context) {
  const { error, result } = ctx;
  if (error) {
    return util.appendError(error.message, error.type, result);
  }
  if (!result || Object.keys(result).length === 0) {
    return null;
  }
  return result;
}
