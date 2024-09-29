import * as ddb from '@aws-appsync/utils/dynamodb'
import { Context } from '@aws-appsync/utils';
import { ProductsQueryVariables } from '../types/graphql';
import * as APITypes from '../types/graphql';

export function request(ctx: Context<ProductsQueryVariables>) {
    const limit = ctx.arguments.limit
    const nextToken = ctx.arguments.cursor

    ctx.stash.limit = limit
    ctx.stash.prev = nextToken
    return ddb.scan({
        limit,
        nextToken
    })
}


export const response = (ctx: Context): APITypes.PaginatedProducts => {
    return {
        __typename: 'PaginatedProducts',
        items: ctx.result.items || [],
        pagination: {
            __typename: 'Pagination',
            limit: ctx.stash.limit,
            next: ctx.result.nextToken,
            prev: ctx.stash.prev
        }
    }
}

