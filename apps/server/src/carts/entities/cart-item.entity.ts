import { Field, Int, ObjectType } from '@nestjs/graphql';

export type CartItemDynamodb = ReturnType<typeof CartItem.toDynamodbObject>;

@ObjectType()
export class CartItem {
  @Field(() => String)
  productId: string;

  @Field(() => Int)
  quantity: number;

  static toDynamodbObject(cartItem: CartItem) {
    return {
      productId: { S: cartItem.productId },
      quantity: { N: cartItem.quantity.toString() },
    };
  }

  static fromDynamodbObject(item: CartItemDynamodb): CartItem {
    const cartItem = new CartItem();
    cartItem.productId = item.productId.S;
    cartItem.quantity = +item.quantity.N;
    return cartItem;
  }
}
