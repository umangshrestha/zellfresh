import { Field, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/products/entities/paginated-product.entry';
import { Review } from './review.entity';

@ObjectType()
export class PaginatedReview {
  @Field(() => [Review])
  items: Review[];
  @Field(() => Pagination)
  pagination: Pagination;
}
