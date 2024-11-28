import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { get_date_time_string } from '../common/get-date-time';
import { Pagination } from '../products/entities/paginated-product.entry';
import { FeedbackInput } from '../reviews/dto/feedback.input';
import { OrderReview } from '../reviews/entities/order-review.entity';
import { DeliveryStatus } from './entities/delivery-status.enum';
import { FilterOrderArgs } from './entities/filter-orders.args';
import { Order } from './entities/order.entity';
import { PaginatedOrder } from './entities/paginated-order.entry';
import { PaymentMethod } from './entities/payment-method.enum';

const TableName = 'ORDERS_TABLE';

@Injectable()
export class OrdersService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  putCommand(order: Order) {
    return {
      Put: {
        TableName,
        Item: marshall(order, { convertClassInstanceToMap: true }),
      },
    };
  }

  async putFeedback(
    userId: string,
    orderId: string,
    feedbackInput: FeedbackInput,
  ) {
    const review = new OrderReview();
    review.rating = feedbackInput.rating;
    review.comment = feedbackInput.comment;
    review.createdAt = get_date_time_string();
    review.updatedAt = get_date_time_string();
    await this.dynamodbService.client.updateItem({
      TableName,
      Key: marshall({ userId, orderId }),
      UpdateExpression: 'SET #review = :review',
      ExpressionAttributeNames: {
        '#review': 'review',
      },
      ExpressionAttributeValues: marshall({ ':review': { ...review } }),
    });
    return review;
  }

  async findAll(
    userId: string | null,
    { limit, cursor }: FilterOrderArgs,
  ): Promise<PaginatedOrder> {
    const orders = userId
      ? await this.dynamodbService.client.query({
          TableName,
          KeyConditionExpression: '#userId = :userId',
          ExpressionAttributeNames: {
            '#userId': 'userId',
          },
          ExpressionAttributeValues: marshall({
            ':userId': userId,
          }),
          Limit: limit,
          ExclusiveStartKey: cursor
            ? unmarshall(JSON.parse(cursor))
            : undefined,
        })
      : await this.dynamodbService.client.scan({
          TableName,
          Limit: limit,
          ExclusiveStartKey: cursor
            ? unmarshall(JSON.parse(cursor))
            : undefined,
        });
    const paginatedOrder = new PaginatedOrder();
    paginatedOrder.pagination = new Pagination();
    paginatedOrder.pagination.limit = 10;
    paginatedOrder.pagination.next = null;
    paginatedOrder.items = orders.Items
      ? orders.Items.map((order) => unmarshall(order) as Order).sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt),
        )
      : [];
    if (orders.LastEvaluatedKey) {
      paginatedOrder.pagination.next = JSON.stringify(orders.LastEvaluatedKey);
    }
    return paginatedOrder;
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

  async canCancel(data: Order | null) {
    if (!data) {
      throw new BadRequestException('Order not found');
    }
    if (data.deliveryStatus === DeliveryStatus.DELIVERED) {
      throw new BadRequestException('Cannot cancel a delivered order');
    }
    if (data.deliveryStatus === DeliveryStatus.CANCELLED) {
      throw new BadRequestException('Order already cancelled');
    }
    const currentUpdatedAt = new Date(data.updatedAt);
    if (
      data.updatedAt !== data.createdAt &&
      currentUpdatedAt.getTime() + 60000 < Date.now()
    ) {
      throw new BadRequestException(
        'Cannot cancel order after 1 minute of creation',
      );
    }
  }

  async changeDeliveryStatus(
    userId: string,
    orderId: string,
    status: DeliveryStatus,
  ) {
    const data = await this.findOne(userId, orderId);
    data.deliveryStatus = status;
    await this.dynamodbService.client.putItem({
      TableName,
      Item: marshall(data),
    });
    return data;
  }

  async cancel(userId: string, orderId: string) {
    const data = await this.findOne(userId, orderId);
    await this.canCancel(data);
    data.deliveryStatus = DeliveryStatus.CANCELLED;

    switch (data.paymentMethod) {
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

  async moveOrdersFromGuestToUser(guestId: string, userId: string) {
    const orders = await this.dynamodbService.client.query({
      TableName,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: marshall({
        ':userId': guestId,
      }),
    });
    const transactItems = orders.Items.flatMap((order) => {
      const orderData = unmarshall(order) as Order;
      orderData.userId = userId;
      return [
        {
          Put: {
            TableName,
            Item: marshall(orderData),
          },
        },
        {
          Delete: {
            TableName,
            Key: marshall({ userId: guestId, orderId: orderData.orderId }),
          },
        },
      ];
    });
    if (transactItems.length === 0) {
      return;
    }
    const command = new TransactWriteItemsCommand({
      TransactItems: transactItems,
    });
    try {
      await this.dynamodbService.client.send(command);
    } catch (error) {
      console.error(error);
    }
  }
}
