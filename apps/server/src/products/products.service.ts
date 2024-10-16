import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductInput } from './dto/create-product.input';
import { PaginatedProduct } from './entities/paginated-product.entry';
import { Product } from './entities/product.entity';

const TableName = 'PRODUCTS_TABLE';
@Injectable()
export class ProductsService {
  private readonly loggerService = new Logger(ProductsService.name);

  constructor(private readonly dynamodbService: DynamodbService) {
    this.seed().catch((error) => {
      this.loggerService.error(error);
    });
  }

  seed() {
    const mock_data = require('../../test/mock-products.json');
    return Promise.all(
      mock_data.map((item: CreateProductInput) => {
        this.create(item);
        this.loggerService.log(`Seeding product: ${item.name}`);
      }),
    );
  }

  async create(item: CreateProductInput) {
    if (!item.productId) {
      item.productId = uuidv4();
    }
    await this.dynamodbService.client.putItem({
      TableName,
      Item: marshall(item),
    });
    return item;
  }

  async findAll(limit: number, cursor: string): Promise<PaginatedProduct> {
    const data = await this.dynamodbService.client.scan({
      TableName,
      Limit: limit,
      ExclusiveStartKey: cursor ? { id: { S: cursor } } : undefined,
    });

    return {
      items: data.Items.map((item) => unmarshall(item) as Product),
      pagination: {
        limit,
        prev: cursor,
        next: data.LastEvaluatedKey ? data.LastEvaluatedKey.id.S : null,
      },
    };
  }

  async findOne(productId: string) {
    const data = await this.dynamodbService.client.getItem({
      TableName,
      Key: { productId: { S: productId } },
    });
    if (!data.Item) {
      return null;
    }
    return unmarshall(data.Item) as Product;
  }

  async update(productId: string, count: number) {
    const product = await this.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.availableQuantity < count) {
      throw new BadRequestException('Product not available');
    }

    if (product.limitPerTransaction < count) {
      throw new BadRequestException('Product limit exceeded');
    }

    return this.dynamodbService.client.updateItem({
      TableName,
      Key: { productId: { S: productId } },
      UpdateExpression:
        'SET availableQuantity = availableQuantity - :count, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':count': { N: count.toString() },
        ':updatedAt': { S: new Date().toISOString() },
      },
    });
  }

  async remove(productId: string) {
    await this.dynamodbService.client.deleteItem({
      TableName,
      Key: { productId: { S: productId } },
    });
    return productId;
  }
}
