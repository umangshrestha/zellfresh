import { AttributeValue } from '@aws-sdk/client-dynamodb';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { ProductsService } from 'src/products/products.service';
import { CartInput } from './dto/cart-input.input';
import { CartItem } from './entities/cart-item.entity';
import { Cart, CartDynamodb } from './entities/cart.entity';

const TableName = 'ORDERS_TABLE';
const orderId = { S: 'CART' };
@Injectable()
export class CartsService {
  cart() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private readonly dynamodbService: DynamodbService,
    private readonly productsService: ProductsService,
  ) {}

  async getCartItem(userId: string, productId: string) {
    const cart = await this.findOne(userId);
    if (!cart) {
      return null;
    }
    const item = cart.items.L.find((item) => item.M.productId.S === productId);
    return item ? CartItem.fromDynamodbObject(item.M) : null;
  }

  async addItemToCart(userId: string, cartItem: CartInput) {
    const product = await this.productsService.findOne(cartItem.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.availableQuantity < cartItem.quantity) {
      throw new BadRequestException('Product not available');
    }

    if (product.limitPerTransaction >= cartItem.quantity) {
      throw new BadRequestException('Product limit exceeded');
    }

    const cart = await this.findOne(userId);
    let items: AttributeValue[] = (
      cart ? cart.items.L : []
    ) as AttributeValue[];

    if (cartItem.quantity === 0) {
      items = items.filter((item) => item.M.productId.S !== cartItem.productId);
    } else {
      items.push({ M: CartItem.toDynamodbObject(cartItem) });
    }

    const data = await this.dynamodbService.client.putItem({
      TableName,
      Item: {
        userId: { S: userId },
        orderId,
        items: { L: items },
        count: { N: items.length.toString() },
      },
    });
    return Cart.fromDynamodbObject(data.Attributes as CartDynamodb);
  }

  async findOne(userId: string) {
    try {
      const data = await this.dynamodbService.client.getItem({
        TableName,
        Key: { userId: { S: userId }, orderId },
      });
      return data.Item as CartDynamodb;
    } catch (error) {
      return null;
    }
  }

  async getCart(userId: string) {
    const data = await this.findOne(userId);
    if (!data) {
      return null;
    }
    return Cart.fromDynamodbObject(data);
  }

  async removeAll(userId: string) {
    return await this.dynamodbService.client.deleteItem({
      TableName,
      Key: { orderId, userId: { S: userId } },
    });
  }
}
