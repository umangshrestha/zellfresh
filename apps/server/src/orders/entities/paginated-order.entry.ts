import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Order } from './order.entity';

@ObjectType()
export class Pagination {
  @Field(() => Int)
  limit: number;
  @Field(() => String, { nullable: true })
  next: string | null;
  @Field(() => String, { nullable: true })
  prev: string | null;
}

@ObjectType()
export class PaginatedOrder {
  @Field(() => [Order])
  items: Order[];
  @Field(() => Pagination)
  pagination: Pagination;
}
