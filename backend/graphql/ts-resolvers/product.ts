import * as ddb from "@aws-appsync/utils/dynamodb";
import { Context } from "@aws-appsync/utils";
import { ProductQueryVariables } from "../types/graphql";
import * as APITypes from "../types/graphql";

export function request(ctx: Context<ProductQueryVariables>) {
  const { id } = ctx.args;
  return ddb.get({ key: { id } });
}

export function response(ctx: Context): APITypes.Product | null {
  if (!ctx.result || Object.keys(ctx.result).length === 0) {
    return null;
  }
  return ctx.result;
}
