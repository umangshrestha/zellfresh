import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { ProductsService } from 'src/products/products.service';
import { CartItem } from './entities/cart-item.entity';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { CartInput } from './dto/cart-input.input';
import { count } from 'console';

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

  async addItemToCart(userId: string, cartItem: CartInput) {
    const product = await this.productsService.findOne(cartItem.productId);
    if (!product) {
      return new NotFoundException('Product not found');
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
      items.push(CartItem.toDynamodbObject(cartItem));
    }

    return Cart.fromDynamodbObject(
      this.dynamodbService.client.putItem({
        TableName,
        Item: {
          userId: { S: userId },
          orderId,
          items: { L: items },
          count: { N: items.length.toString() },
        },
      }),
    );
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
    return Cart.fromDynamodbObject(data);
  }

  async removeAll(userId: string) {
    const data = await this.dynamodbService.client.deleteItem({
      TableName,
      Key: { orderId, userId: { S: userId } },
    });
  }
}
