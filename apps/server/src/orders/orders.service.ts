import {
  TransactionCanceledException,
  TransactWriteItemsCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { v4 as uuid } from 'uuid';
import { AddressesService } from '../addresses/addresses.service';
import { CartsService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { DeliveryStatus } from './entities/delivery-status.enum';
import { Order, PaymentDetails } from './entities/order.entity';
import { PaymentMethod } from './entities/payment-method.enum';
const TableName = 'ORDERS_TABLE';

@Injectable()
export class OrdersService {
  private readonly loggerService = new Logger(OrdersService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly dynamodbService: DynamodbService,
    private readonly cartsService: CartsService,
    private readonly addressesService: AddressesService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly productsCacheService: ProductsService,
  ) {}

  async checkout(userId: string, paymentMethod: PaymentMethod) {
    const user = await this.usersService.findOne(userId);
    const cart = await this.cartsService.getCart(userId);
    if (!cart) {
      throw new BadRequestException('Cart not found');
    }
    if (cart.count === 0) {
      throw new BadRequestException('Cart is empty');
    }
    const address = await this.addressesService.findOne(
      userId,
      user.defaultAddressId,
    );
    const order = new Order();
    order.userId = userId;
    order.items = cart.items;
    order.shippingAddress = address;
    order.deliveryStatus = DeliveryStatus.PENDING;
    order.orderId = uuid();
    order.contactDetails = {
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
    order.paymentDetails = new PaymentDetails();
    order.paymentDetails.subTotal = 0;
    order.deliveryStatus = DeliveryStatus.PENDING;
    order.paymentDetails.tax =
      order.paymentDetails.subTotal * this.configService.get('TAX_RATE');
    order.paymentDetails.deliveryPrice =
      this.configService.get('DELIVERY_PRICE');
    for (const item of order.items) {
      const product = await this.productsCacheService.findOne(item.productId);
      order.paymentDetails.subTotal += product.price * item.quantity;
    }
    order.paymentDetails.totalPrice =
      order.paymentDetails.subTotal +
      order.paymentDetails.tax +
      order.paymentDetails.deliveryPrice;
    order.paymentDetails.paymentMethod = paymentMethod;

    const transactItems =
      await this.productsService.createUpdateStockTransactionCommand(
        cart.items,
      );

    transactItems.push({
      Put: {
        TableName,
        Item: marshall(order, { convertClassInstanceToMap: true }),
      },
    });
    transactItems.push(this.cartsService.clearCartCommand(userId));
    const command = new TransactWriteItemsCommand({
      TransactItems: transactItems,
    });

    try {
      await this.dynamodbService.client.send(command);
    } catch (error) {
      this.loggerService.error(
        `Error creating order: ${error} for data: ${JSON.stringify(order)}`,
      );
      if (error instanceof TransactionCanceledException) {
        if (error.CancellationReasons) {
          for (const reason of error.CancellationReasons) {
            console.error(reason);
            if (reason.Code === 'ConditionalCheckFailed') {
              throw new BadRequestException('Insufficient stock');
            }
          }
        }
      }
      console.error('transact items', transactItems);
      console.error('error', error);
      throw new BadRequestException('Error creating order');
    }
    return order;
  }

  async findAll(userId: string) {
    const orders = await this.dynamodbService.client.query({
      TableName,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: marshall({
        ':userId': userId,
      }),
    });
    if (!orders.Items) {
      return [];
    }
    return orders.Items.map((order) => unmarshall(order) as Order);
  }

  async findOne(userId: string, orderId: string) {
    const order = await this.dynamodbService.client.getItem({
      TableName,
      Key: marshall({ userId, orderId }),
    });
    if (!order.Item) {
      return null;
    }
    return unmarshall(order.Item) as Order;
  }

  async cancel(userId: string, orderId: string) {
    const data = await this.findOne(userId, orderId);
    if (!data) {
      throw new BadRequestException('Order not found');
    }
    if (data.deliveryStatus === DeliveryStatus.DELIVERED) {
      throw new BadRequestException('Cannot cancel a delivered order');
    }
    if (data.deliveryStatus === DeliveryStatus.CANCELLED) {
      throw new BadRequestException('Order already cancelled');
    }
    data.deliveryStatus = DeliveryStatus.CANCELLED;

    switch (data.paymentDetails.paymentMethod) {
      case PaymentMethod.CARD:
        // Refund the payment
        break;
      case PaymentMethod.CASH:
        // No refund needed
        break;
      case PaymentMethod.UPI:
        // Refund the upi
        break;
      default:
        throw new BadRequestException('Unknown payment method');
    }
    await this.dynamodbService.client.putItem({
      TableName,
      Item: marshall(data),
    });
    return data;
  }
}
