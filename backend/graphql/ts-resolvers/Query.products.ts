import * as ddb from "@aws-appsync/utils/dynamodb";
import { Context } from "@aws-appsync/utils";
import { ProductsQueryVariables } from "../../types/graphql";

export function request(ctx: Context<ProductsQueryVariables>) {
  const maxLimit = 20;
  const limit = Math.min(ctx.arguments.limit as number, maxLimit);
  const nextToken = ctx.arguments.cursor;
  return ddb.scan({
    limit,
    nextToken,
  });
}

export const response = (ctx: Context) => {
  const { error, result } = ctx;
  if (error) {
    return util.appendError(error.message, error.type, result);
  }
  const { items = [], nextToken: next } = result;
  const { limit, cursor: prev } = ctx.arguments;
  return {
    items,
    pagination: {
      limit,
      prev,
      next,
    },
  };
};
