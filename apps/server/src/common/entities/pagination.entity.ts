import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field(() => Int)
  limit: number;
  @Field({ nullable: true })
  next: string | null;
  @Field({ nullable: true })
  prev: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}
