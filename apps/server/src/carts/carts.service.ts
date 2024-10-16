import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { ProductsService } from 'src/products/products.service';
import { CartInput } from './dto/cart-input.input';
import { Cart } from './entities/cart.entity';
import { PaginatedCart } from './entities/paginated-cart.entry';

const TableName = 'ORDERS_TABLE';
const orderId = { S: 'CART' };

@Injectable()
export class CartsService {
  constructor(
    private readonly dynamodbService: DynamodbService,
    private readonly productsService: ProductsService,
  ) {}

  async findAll(limit: number, cursor: string): Promise<PaginatedCart> {
    const data = await this.dynamodbService.client.scan({
      TableName,
      Limit: limit,
      ExclusiveStartKey: cursor ? { id: { S: cursor } } : undefined,
    });

    return {
      items: data.Items.map((item) => unmarshall(item) as Cart),
      pagination: {
        limit,
        prev: cursor,
        next: data.LastEvaluatedKey ? data.LastEvaluatedKey.id.S : null,
      },
    };
  }

  async getCartCount(userId: string) {
    const data = await this.dynamodbService.client.getItem({
      TableName,
      Key: { userId: { S: userId }, orderId },
      ProjectionExpression: 'count',
    });
    return data.Item ? +data.Item.count.N : 0;
  }

  async createEmptyCart(userId: string, overwrite = false) {
    const cart = new Cart();
    cart.userId = userId;
    try {
      await this.dynamodbService.client.putItem({
        TableName,
        Item: marshall({ cart, orderId: 'CART' }),
        ConditionExpression: overwrite
          ? undefined
          : 'attribute_not_exists(userId)',
      });
      return cart;
    } catch (error) {
      return null;
    }
  }

  async moveCartItemsFromGuestToUser(guestId: string, userId: string) {
    const guestCart = await this.findOne(guestId);
    if (!guestCart) {
      return this.createEmptyCart(userId, false);
    }
    if (guestCart.count.N === '0') {
      this.deleteCart(guestId);
      return this.createEmptyCart(userId, false);
    }
    const userCart = await this.findOne(userId);
    if (!userCart) {
      return this.createEmptyCart(userId, false);
    }

    let items: AttributeValue[] = (
      userCart ? userCart.items.L : []
    ) as AttributeValue[];

    items.push(...guestCart.items.L);
    items = items.filter((item, index, self) => {
      return (
        index === self.findIndex((t) => t.M.productId.S === item.M.productId.S)
      );
    });

    await this.dynamodbService.client.putItem({
      TableName,
      Item: {
        userId: { S: userId },
        orderId,
        items: { L: items },
        count: { N: items.length.toString() },
        updatedAt: { N: Date.now().toString() },
      },
    });
  }

  async getCartItem(userId: string, productId: string) {
    const defaultItem = {
      quantity: 0,
      productId,
    };
    const cart = await this.findOne(userId);
    if (!cart) {
      return defaultItem;
    }
    const item = cart.items.L.find((item) => item.M.productId.S === productId);
    if (!item) {
      return defaultItem;
    }
    return unmarshall(item);
  }

  async addItemToCart(userId: string, cartItem: CartInput) {
    await this.productsService.update(cartItem.productId, cartItem.quantity);
    const cart = await this.findOne(userId);
    let items: AttributeValue[] = (
      cart ? cart.items.L : []
    ) as AttributeValue[];

    if (cartItem.quantity === 0) {
      items = items.filter((item) => item.M.productId.S !== cartItem.productId);
    } else {
      let found = false;
      for (const item of items) {
        if (item.M.productId.S === cartItem.productId) {
          item.M.quantity.N = (
            +item.M.quantity.N + cartItem.quantity
          ).toString();
          item.M.updatedAt.S = cartItem.updatedAt;
          found = true;
          break;
        }
      }
      if (!found) {
        items.push({ M: marshall(cartItem) });
      }
    }

    await this.dynamodbService.client.putItem({
      TableName,
      Item: {
        userId: { S: userId },
        orderId,
        items: { L: items },
        count: { N: items.length.toString() },
      },
    });
    return this.getCart(userId);
  }

  async findOne(userId: string) {
    try {
      const data = await this.dynamodbService.client.getItem({
        TableName,
        Key: { userId: { S: userId }, orderId },
      });
      return data.Item;
    } catch (error) {
      return null;
    }
  }

  async getCart(userId: string) {
    const data = await this.findOne(userId);
    if (!data) {
      return null;
    }
    return unmarshall(data) as Cart;
  }

  deleteCart(userId: string) {
    return this.dynamodbService.client.deleteItem({
      TableName,
      Key: { orderId, userId: { S: userId } },
    });
  }
}
