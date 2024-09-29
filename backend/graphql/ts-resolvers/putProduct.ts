import * as ddb from '@aws-appsync/utils/dynamodb';
import { Context, util } from '@aws-appsync/utils';
import { PutProductMutationVariables,  } from '../types/graphql';
import * as APITypes from '../types/graphql';

export function request(ctx: Context<PutProductMutationVariables>) {
]  const item = ctx.args.product;
  const id = item.id || util.autoId();
  return ddb.put({
    key: { id},
    item: {
      ...item,
      id
    }
  });
}

export function response(ctx: Context): APITypes.Product {
  return ctx.result;
}