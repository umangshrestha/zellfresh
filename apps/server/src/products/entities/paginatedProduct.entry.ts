import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
class Pagination {
  @Field(type => Int)
  limit: number;
  @Field({ nullable: true })
  next: string | null;
  @Field({ nullable: true })
  prev: string | null;
}

@ObjectType()
export class PaginatedProduct {
  @Field(() => [Product])
  items: Product[];
  @Field(() => Pagination)
  pagination: Pagination;
}
