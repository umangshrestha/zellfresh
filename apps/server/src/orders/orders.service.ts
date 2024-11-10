import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { v4 as uuid } from 'uuid';
import {Order} from './entities/order.entity'
import {PaginatedOrder} from './entities/paginated-order.entry'

const TableName = 'ORDER_TABLE';

@Injectable()
export class OrdersService {

  private readonly loggerService = new Logger(OrdersService.name);

  seed() {
    const mock_data = require('../../test/mock-products.json');
    return this.dynamodbService.client.batchWriteItem({
      RequestItems: {
        [TableName]: mock_data.map((item: CreateOrderInput) => ({
          PutRequest: { Item: marshall(item) },
        })),
      },
    });
  }


  constructor(private readonly dynamodbService: DynamodbService) {
    this.seed().catch((error) => {
      this.loggerService.error(error);
    });
  }

  async create(order: CreateOrderInput) {
    if (!order.orderId) {
      order.orderId = uuid();
    }
    await this.dynamodbService.client.putItem({
      TableName,
      Item: marshall(order),
    });
    return order;
  }

  async findAll(): Promise<Order[]> {
    const scanParams = {
        TableName,
    };

    const data = await this.dynamodbService.client.scan(scanParams);
    return data.Items.map((item) => unmarshall(item) as Order).sort((a, b) => {
        return a.createdAt.localeCompare(b.createdAt);
    });
}

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
