import { Field, ObjectType } from '@nestjs/graphql';
import {
  PaginatedResponse,
  Pagination,
} from 'src/common/entities/pagination.entity';
import { Cart } from './cart.entity';

@ObjectType()
export class PaginatedCart implements PaginatedResponse<Cart> {
  @Field(() => [Cart])
  items: Cart[];
  @Field(() => Pagination)
  pagination: Pagination;
}
