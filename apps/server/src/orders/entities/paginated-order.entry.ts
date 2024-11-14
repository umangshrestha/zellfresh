import { Field, ObjectType } from '@nestjs/graphql';

import { Pagination } from '../../products/entities/paginated-product.entry';
import { Order } from './order.entity';

@ObjectType()
export class PaginatedOrder {
  @Field(() => [Order])
  items: Order[];
  @Field(() => Pagination)
  pagination: Pagination;
}
