import * as ddb from "@aws-appsync/utils/dynamodb";
import { Context } from "@aws-appsync/utils";
import { ProductsQueryVariables } from "../types/graphql";
import * as APITypes from "../types/graphql";
import { Product } from "../types/graphql";

export function request(ctx: Context<ProductsQueryVariables>) {
  const maxLimit = 20;
  const limit = Math.min(ctx.arguments.limit as number, maxLimit);
  const nextToken = ctx.arguments.cursor;

  return ddb.scan({
    limit,
    nextToken,
  });
}

export const response = (ctx: Context): APITypes.PaginatedProducts => {
  const request = ctx.request as ddb.ScanInput<APITypes.Product>;
  const limit = request.limit as number;
  const prev = request.nextToken as string | null;
  const next = ctx.result.nextToken as string | null;
  const items = ctx.result.items || [];
  return {
    __typename: "PaginatedProducts",
    items,
    pagination: {
      __typename: "Pagination",
      limit,
      prev,
      next,
    },
  };
};
