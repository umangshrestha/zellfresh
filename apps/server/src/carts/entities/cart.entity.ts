import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { CartItem } from './cart-item.entity';

@ObjectType()
export class Cart {
  @Field(() => String)
  userId: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field(() => Int)
  count: number;

  static toDynamodbObject(item: Cart): Record<string, AttributeValue> {
    return {
      userId: { S: item.userId },
      items: { L: item.items.map((item) => CartItem.toDynamodbObject(item)) },
      count: { N: item.count.toString() },
    };
  }

  static fromDynamodbObject(item: any): Cart {
    const cart = new Cart();
    cart.userId = item.userId.S;
    cart.items = item.items.L.map((item: any) =>
      CartItem.fromDynamodbObject(item.M),
    );
    cart.count = item.count.N;
    return cart;
  }
}
