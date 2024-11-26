import { Field, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/products/entities/paginated-product.entry';
import { ProductReview } from './product-review.entity';

@ObjectType()
export class PaginatedProductReview {
  @Field(() => [ProductReview])
  items: ProductReview[];
  @Field(() => Pagination)
  pagination: Pagination;
}
