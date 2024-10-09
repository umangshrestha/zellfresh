import { Injectable, Logger } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { v4 as uuidv4 } from 'uuid';
import { DynamodbService } from 'src/dynamodb/dynamodb.service';
import { PaginatedProduct } from './entities/paginatedProduct.entry';
import { Product } from './entities/product.entity';

const TableName = 'PRODUCTS_TABLE';
@Injectable()
export class ProductsService {
  private readonly loggerService = new Logger(ProductsService.name);

  constructor(private readonly dynamodbService: DynamodbService) {
    this.seed();
  }

  async seed() {
    const MOCK_DATA_PATH = `../../mock/mockproduct.json`;
    for (const product of require(MOCK_DATA_PATH)) {
      this.loggerService.debug(`Seeding product ${product.name}`);
      await this.create(product);
    }
    this.loggerService.log(`Seeding completed`);
  }

  create(createProductInput: CreateProductInput) {
    if (!createProductInput.productId) {
      createProductInput.productId = uuidv4();
    }
    return this.dynamodbService.client.putItem({
      TableName,
      Item: {
        ...Product.toDynamodbObject(createProductInput),
        createdAt: { S: new Date().toISOString() },
        updatedAt: { S: new Date().toISOString() },
      },
    });
  }

  async findAll(limit: number, cursor: string): Promise<PaginatedProduct> {
    const data = await this.dynamodbService.client.scan({
      TableName,
      Limit: limit,
      ExclusiveStartKey: cursor ? { id: { S: cursor } } : undefined,
    });

    return {
      items: data.Items.map((item) => Product.fromDynamodbObject(item)),
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
    this.loggerService.log(data);
    return Product.fromDynamodbObject(data.Item as any);
  }

  update(productId: string, count: number) {
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
    const data = await this.dynamodbService.client.deleteItem({
      TableName,
      Key: { productId: { S: productId } },
    });
    return data;
  }
}
