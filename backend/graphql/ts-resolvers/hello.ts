import { Context } from "@aws-appsync/utils";
import { HelloQueryVariables } from "../types/graphql";
import * as APITypes from "../types/graphql";

export function request(ctx: Context<HelloQueryVariables>) {
  return {};
}

export function response(ctx: Context): APITypes.HelloQuery["hello"] {
  const name = ctx.arguments.name || "World";
  return `Hello, ${name}!`;
}
