import {
  TransactionCanceledException,
  TransactWriteItemsCommand,
} from '@aws-sdk/client-dynamodb';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { v4 as uuid } from 'uuid';
import { AddressesService } from '../addresses/addresses.service';
import { CartsService } from '../carts/carts.service';
import { get_date_time_string } from '../common/get-date-time';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { DeliveryStatus } from './entities/delivery-status.enum';
import { Order, OrderItem } from './entities/order.entity';
import { PaymentMethod } from './entities/payment-method.enum';
import { OrdersService } from './orders.service';
import { CartItem } from '../carts/entities/cart-item.entity';
import { CheckoutDetails } from './entities/checkout-details.entity';


@Injectable()
export class CheckoutService {
  private readonly loggerService = new Logger(CheckoutService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly dynamodbService: DynamodbService,
    private readonly cartsService: CartsService,
    private readonly addressesService: AddressesService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  async getCheckoutDetails(items: CartItem[]| OrderItem []) {
    const checkoutDetails = new CheckoutDetails()
    checkoutDetails.taxPercentage = this.configService.get('TAX_RATE');
    checkoutDetails.deliveryPrice = this.configService.get('DELIVERY_PRICE');
    checkoutDetails.discount = 0;
    checkoutDetails.subTotal = 0;
    checkoutDetails.enableCheckout = true;
    for (const item of items) {
      if (item instanceof OrderItem) {
        checkoutDetails.subTotal += item.price * item.quantity;
      } else {
        const price = await this.productsService.getPrice(item.productId);
        checkoutDetails.subTotal += price * item.quantity;
        checkoutDetails.enableCheckout  &&= (price > 0);
      }
    }

    checkoutDetails.tax = (checkoutDetails.subTotal - checkoutDetails.discount) * checkoutDetails.taxPercentage;

    checkoutDetails.totalPrice =
      checkoutDetails.subTotal +
      checkoutDetails.tax +
      checkoutDetails.deliveryPrice
      - checkoutDetails.discount;

    return checkoutDetails
  }

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

    order.items = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);
        return {
          ...item,
          price: product.price,
        };
      }),
    );
    order.shippingAddress = address;
    order.deliveryStatus = DeliveryStatus.PENDING;
    order.orderId = uuid();
    order.contactDetails = {
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
    order.createdAt = get_date_time_string();
    order.updatedAt = get_date_time_string();
    order.deliveryStatus = DeliveryStatus.PENDING;
    order.paymentMethod = paymentMethod;
    order.checkoutDetails = await this.getCheckoutDetails(order.items);

    const transactItems =
      await this.productsService.createUpdateStockTransactionCommand(
        cart.items,
      );

    transactItems.push(
      this.ordersService.putCommand(order),
    );
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
}
