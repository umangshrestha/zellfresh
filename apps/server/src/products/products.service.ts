import { TransactWriteItem } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { CartItem } from '../carts/entities/cart-item.entity';
import { FilterProductsArgs } from './dto/filter-product.args';
import { PutProductInput } from './dto/put-product.input';
import { PaginatedProduct } from './entities/paginated-product.entry';
import { Product } from './entities/product.entity';
import { ProductsCacheService } from './products-cache.service';

const TableName = 'PRODUCTS_TABLE';

@Injectable()
export class ProductsService {
  private readonly loggerService = new Logger(ProductsService.name);
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly prismService: PrismaService,
    private readonly productsCacheService: ProductsCacheService,
    private readonly dynamodbService: DynamodbService,
  ) {
    this.syncProducts([], true).then(() => {
      this.loggerService.log('Products synced');
    });
  }

  checkIfCategoryExists(category: string): Promise<boolean> {
    return this.productsCacheService.checkIfCategoryExists(category);
  }

  async put(item: PutProductInput, ignoreCache = false) {
    const rating = await this.reviewsService.getRating(item.productId);
    if (!ignoreCache) {
      await this.productsCacheService.put(item, rating);
    }
    return this.dynamodbService.client.putItem({
      TableName,
      Item: marshall({ ...item, rating: { ...rating } }),
    });
  }

  async findAll(args: FilterProductsArgs): Promise<PaginatedProduct> {
    const cache = await this.productsCacheService.findAll(args);
    if (cache) {
      return cache;
    }
    const {
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
    } = args;
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
              return sortAsc ? a.price - b.price : b.price - a.price;
            case 'rating':
              return sortAsc
                ? a.rating.rating - b.rating.rating
                : b.rating.rating - a.rating.rating;
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
        next: data.LastEvaluatedKey ? data.LastEvaluatedKey.productId.S : null,
      },
    };
  }

  async findOne(productId: string) {
    const cache = await this.productsCacheService.findOne(productId);
    if (cache) {
      return cache;
    }
    const data = await this.dynamodbService.client.getItem({
      TableName,
      Key: marshall({ productId }),
    });
    if (!data.Item) {
      return null;
    }
    return unmarshall(data.Item) as Product;
  }

  createUpdateStockTransactionCommand(
    items: CartItem[],
  ): Promise<TransactWriteItem[]> {
    const transactItems = items.map(async ({ productId, quantity }) => {
      const cache = await this.productsCacheService.findOne(productId);
      if (!cache) {
        throw new NotFoundException('Product not found');
      } else if (cache.limitPerTransaction < quantity) {
        throw new BadRequestException('Product limit exceeded');
      }

      return {
        Update: {
          Key: marshall({ productId }),
          TableName: TableName,
          ConditionExpression: 'availableQuantity >= :count',
          UpdateExpression:
            'SET availableQuantity = availableQuantity - :count, updatedAt = :updatedAt',
          ExpressionAttributeValues: {
            ':count': { N: quantity.toString() },
            ':updatedAt': { S: new Date().toISOString() },
          },
        },
      };
    });
    return Promise.all(transactItems);
  }
  async remove(productId: string) {
    // Delete from DynamoDB
    try {
      await this.dynamodbService.client.deleteItem({
        TableName,
        Key: marshall({ productId }),
      });
      // Delete from Prisma
      await this.productsCacheService.remove(productId);
      return productId;
    } catch (error) {
      this.loggerService.error(`Error deleting product: ${error}`);
      return false;
    }
  }

  async syncProducts(ignoreIds: string[], ignoreCache = false) {
    const entries = await this.prismService.product.findMany({
      where: {
        NOT: {
          productId: {
            in: ignoreIds,
          },
        },
      },
    });

    for (const entry of entries) {
      const product = new PutProductInput();
      product.productId = entry.productId;
      product.name = entry.name;
      product.description = entry.description;
      product.price = entry.price;
      product.availableQuantity = entry.availableQuantity;
      product.unit = entry.unit;
      product.limitPerTransaction = entry.limitPerTransaction;
      product.badgeText = entry.badgeText;
      product.category = entry.category;
      product.tags = entry.tags.split(',');
      product.imageUrl = entry.imageUrl;
      await this.put(product, ignoreCache);
    }
  }

  async getPrice(productId: string) {
    const cache = await this.productsCacheService.getPrice(productId);
    if (cache) {
      return cache;
    }
    const data = await this.dynamodbService.client.getItem({
      TableName,
      Key: marshall({ productId }),
      ProjectionExpression: 'price, availableQuantity',
    });
    if (!data.Item || +data.Item.availableQuantity.N <= 0) {
      return 0;
    }
    return +data.Item.price.N || 0;
  }
}
