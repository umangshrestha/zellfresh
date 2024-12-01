import {
  AttributeValue,
  ConditionalCheckFailedException,
  TransactWriteItem,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { get_date_time_string } from 'src/common/get-date-time';
import { CartInput } from './dto/cart-input.input';
import { Cart } from './entities/cart.entity';
import { CreateCart } from './types/create-cart.interface';
const TableName = 'CARTS_TABLE';

@Injectable()
export class CartsService {
  private readonly loggerService = new Logger(CartsService.name);
  private ttl: number = this.configService.getOrThrow('CART_TTL');

  constructor(
    private readonly configService: ConfigService,
    private readonly dynamodbService: DynamodbService,
  ) {}

  updateTTL(userId: string) {
    return this.dynamodbService.client.updateItem({
      TableName,
      Key: { userId: { S: userId } },
      UpdateExpression: 'SET #ttl = :ttl',
      ExpressionAttributeNames: {
        '#ttl': 'ttl',
      },
      ExpressionAttributeValues: {
        ':ttl': { N: (this.ttl + Math.floor(Date.now() / 1000)).toString() },
      },
    });
  }

  newEmptyCart = (userId: string) => {
    return {
      userId,
      items: [],
      count: 0,
      createdAt: get_date_time_string(),
      updatedAt: get_date_time_string(),
      ttl: this.ttl + Math.floor(Date.now() / 1000),
    };
  };

  async createEmptyCart(userId: string, { overwrite }: CreateCart) {
    const cart = this.newEmptyCart(userId);
    try {
      await this.dynamodbService.client.putItem({
        TableName,
        Item: marshall(cart),
        ConditionExpression: overwrite
          ? undefined
          : 'attribute_not_exists(userId)',
      });
      return cart;
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        return null;
      }
      this.loggerService.error(
        `Error creating cart: ${error} for data: ${JSON.stringify(cart)}`,
      );
      await this.updateTTL(userId);
      return null;
    }
  }

  async getCount(userId: string) {
    const cart = await this.dynamodbService.client.getItem({
      TableName,
      Key: { userId: { S: userId } },
      ProjectionExpression: '#c',
      ExpressionAttributeNames: {
        '#c': 'count',
      },
    });
    return cart.Item ? parseInt(cart.Item.count.N) : 0;
  }

  async moveCartItemsFromGuestToUser(guestId: string, userId: string) {
    const guestCart = await this.findOne(guestId);
    if (!guestCart) {
      return this.createEmptyCart(userId, { overwrite: false });
    }
    if (guestCart.count.N === '0') {
      return this.createEmptyCart(userId, { overwrite: false });
    }
    const userCart = await this.findOne(userId);
    if (!userCart) {
      return this.createEmptyCart(userId, { overwrite: false });
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
    return unmarshall(item.M);
  }

  async addItemToCart(userId: string, cartItem: CartInput) {
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
          item.M.quantity.N = cartItem.quantity.toString();
          item.M.updatedAt.S = cartItem.updatedAt;
          found = true;
          break;
        }
      }

      if (!found) {
        items.push({
          M: marshall({ ...cartItem, updatedAt: cartItem.updatedAt }),
        });
      }
    }
    await this.dynamodbService.client.putItem({
      TableName,
      Item: {
        userId: { S: userId },
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
        Key: { userId: { S: userId } },
      });
      return data.Item;
    } catch (error) {
      this.loggerService.error(`Error fetching cart: ${error}`);
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
      Key: { userId: { S: userId } },
    });
  }

  clearCartCommand(userId: string): TransactWriteItem {
    return {
      Put: {
        TableName,
        Item: marshall(this.newEmptyCart(userId)),
      },
    };
  }
}
