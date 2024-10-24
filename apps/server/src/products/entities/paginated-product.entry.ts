import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Product } from './product.entity';

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
export class PaginatedProduct {
  @Field(() => [Product])
  items: Product[];
  @Field(() => Pagination)
  pagination: Pagination;
}
