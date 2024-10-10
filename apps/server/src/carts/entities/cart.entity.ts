import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CartItem } from './cart-item.entity';

export type CartDynamodb = ReturnType<typeof Cart.toDynamodbObject>;

@ObjectType()
export class Cart {
  @Field(() => String)
  userId: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field(() => Int)
  count: number;

  static toDynamodbObject(item: Cart) {
    return {
      userId: { S: item.userId },
      items: {
        L: item.items.map((item) => ({ M: CartItem.toDynamodbObject(item) })),
      },
      count: { N: item.count.toString() },
    };
  }

  static fromDynamodbObject(item: CartDynamodb): Cart {
    const cart = new Cart();
    cart.userId = item.userId.S;
    cart.items = item.items.L.map((item: any) =>
      CartItem.fromDynamodbObject(item.M),
    );
    cart.count = +item.count.N;
    return cart;
  }
}
