import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CartItem {
  @Field(() => String)
  productId: string;

  @Field(() => Int)
  quantity: number;

  static toDynamodbObject(cartItem: CartItem): AttributeValue.MMember {
    return {
      M: {
        productId: { S: cartItem.productId },
        quantity: { N: cartItem.quantity.toString() },
      },
    };
  }

  static fromDynamodbObject(item: AttributeValue.MMember): CartItem {
    const cartItem = new CartItem();
    cartItem.productId = item.M.productId.S;
    cartItem.quantity = +item.M.quantity.N;
    return cartItem;
  }
}
