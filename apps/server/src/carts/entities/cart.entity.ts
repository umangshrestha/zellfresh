import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CartItem } from './cart-item.entity';

@ObjectType()
export class Cart {
  @Field(() => String)
  userId: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field(() => Int)
  count: number;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
