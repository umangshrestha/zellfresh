import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CartItem } from './cart-item.entity';

export interface CartKey {
  userId: string;
  orderId: string;
}

@ObjectType()
export class Cart implements CartKey {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  orderId: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field(() => Int)
  count: number;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
