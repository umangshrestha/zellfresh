import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { v4 as uuid } from 'uuid';
import { CreateProductInput } from './dto/create-product.input';
import { FilterProductsInput } from './dto/filter-product.args';
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
    return this.dynamodbService.client.batchWriteItem({
      RequestItems: {
        [TableName]: mock_data.map((item: CreateProductInput) => ({
          PutRequest: { Item: marshall(item) },
        })),
      },
    });
  }

  async create(item: CreateProductInput) {
    if (!item.productId) {
      item.productId = uuid();
    }
    await this.dynamodbService.client.putItem({
      TableName,
      Item: marshall(item),
    });
    return item;
  }

  async findAll({
    limit = 20,
    cursor,
    category,
    minRating,
    maxRating,
    minPrice,
    maxPrice,
    name,
    tags,
    sortBy,
    sortAsc,
    showOutOfStock,
  }: FilterProductsInput): Promise<PaginatedProduct> {
    const filterExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};
    if (category) {
      filterExpressions.push('category = :category');
      expressionAttributeValues[':category'] = { S: category };
    }
    if (minRating) {
      filterExpressions.push('rating >= :minRating');
      expressionAttributeValues[':minRating'] = { N: minRating.toString() };
    }
    if (maxRating) {
      filterExpressions.push('rating <= :maxRating');
      expressionAttributeValues[':maxRating'] = { N: maxRating.toString() };
    }
    if (minPrice) {
      filterExpressions.push('price >= :minPrice');
      expressionAttributeValues[':minPrice'] = { N: minPrice.toString() };
    }
    if (maxPrice) {
      filterExpressions.push('price <= :maxPrice');
      expressionAttributeValues[':maxPrice'] = { N: maxPrice.toString() };
    }

    if (name) {
      filterExpressions.push('contains(name, :name)');
      expressionAttributeValues[':name'] = { S: name };
    }

    if (tags) {
      filterExpressions.push('contains(tags, :tags)');
      expressionAttributeValues[':tags'] = { SS: tags };
    }
    if (!showOutOfStock) {
      filterExpressions.push('availableQuantity > :count');
      expressionAttributeValues[':count'] = { N: '0' };
    }

    const scanParams =
      filterExpressions.length > 0
        ? {
            TableName,
            Limit: limit,
            FilterExpression: filterExpressions.join(' AND '),
            ExpressionAttributeValues: expressionAttributeValues,
            ExclusiveStartKey: cursor
              ? marshall({ productId: cursor })
              : undefined,
          }
        : {
            TableName,
            Limit: limit,
            ExclusiveStartKey: cursor
              ? marshall({ productId: cursor })
              : undefined,
          };

    const data = await this.dynamodbService.client.scan(scanParams);
    return {
      items: data.Items.map((item) => unmarshall(item) as Product).sort(
        (a, b) => {
          switch (sortBy) {
            case 'price':
            case 'rating':
              return sortAsc ? a.price - b.price : b.price - a.price;
            case 'name':
              return sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            default:
              return 0;
          }
        },
      ),
      pagination: {
        limit,
        prev: cursor,
        next: data.LastEvaluatedKey ? data.LastEvaluatedKey.productId.S : null,
      },
    };
  }

  async findOne(productId: string) {
    const data = await this.dynamodbService.client.getItem({
      TableName,
      Key: marshall({ productId }),
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
      Key: marshall({ productId }),
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
      Key: marshall({ productId }),
    });
    return productId;
  }
}
