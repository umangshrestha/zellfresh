import { Field, ObjectType } from '@nestjs/graphql';
import {
  PaginatedResponse,
  Pagination,
} from 'src/common/entities/pagination.entity';
import { Product } from './product.entity';

@ObjectType()
export class PaginatedProduct implements PaginatedResponse<Product> {
  @Field(() => [Product])
  items: Product[];
  @Field(() => Pagination)
  pagination: Pagination;
}
