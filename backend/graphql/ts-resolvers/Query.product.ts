import * as ddb from "@aws-appsync/utils/dynamodb";
import { Context } from "@aws-appsync/utils";
import { ProductQueryVariables } from "../types/graphql";

export function request(ctx: Context<ProductQueryVariables>) {
  const { id } = ctx.args;
  const projection = ctx.info.selectionSetList.map((field) =>
    field.replace("/", "."),
  );
  return ddb.get({ key: { id }, projection });
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
