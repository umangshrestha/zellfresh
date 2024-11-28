import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { DynamodbService } from '../common/dynamodb/dynamodb.service';
import { get_date_time_string } from '../common/get-date-time';
import { FeedbackInput } from './dto/feedback.input';
import { FilterReviewArgs } from './dto/filter-review.args';
import { PaginatedProductReview } from './entities/paginated-product-review.entity';
import { ProductReview } from './entities/product-review.entity';
import { Rating } from './entities/rating.entity';

const TableName = 'REVIEWS_TABLE';
@Injectable()
export class ReviewsService {
  private readonly loggerService = new Logger(ReviewsService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly dynamodbService: DynamodbService,
  ) {}

  getKeyName(productId: string) {
    return `rating-${productId}`;
  }

  async put(userId: string, productId: string, putReviewInput: FeedbackInput) {
    const review = new ProductReview();
    review.userId = userId;
    review.productId = productId;
    review.rating = putReviewInput.rating;
    review.comment = putReviewInput.comment;
    review.createdAt = get_date_time_string();
    review.updatedAt = get_date_time_string();
    try {
      await this.dynamodbService.client.putItem({
        TableName,
        Item: marshall({ ...review }),
      });
      await this.cacheManager.del(this.getKeyName(productId));
      return review;
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        return null;
      }
      this.loggerService.error(
        `Error creating cart: ${error} for data: ${JSON.stringify(review)}`,
      );
      return null;
    }
  }

  async getRating(productId: string): Promise<Rating> {
    const cachedRating = await this.cacheManager.get<Rating>(
      this.getKeyName(productId),
    );
    if (cachedRating) {
      return cachedRating;
    }

    this.loggerService.warn(`Cache miss for productId: ${productId}`);

    const rating = new Rating();
    try {
      const data = await this.dynamodbService.client.query({
        TableName,
        KeyConditionExpression: 'productId = :productId',
        ExpressionAttributeValues: {
          ':productId': { S: productId },
        },
      });
      const reviews = data.Items.map(
        (item) => unmarshall(item) as ProductReview,
      );
      const total = reviews.length;
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      rating.rating = sum / total;
      if (isNaN(rating.rating)) {
        rating.rating = 0;
      } else {
        rating.rating = parseFloat(rating.rating.toFixed(1));
      }
      rating.count = total;
    } catch (error) {
      rating.rating = 0;
      rating.count = 0;
      this.loggerService.error(
        `Error getting rating: ${error} for productId: ${productId}`,
      );
    }

    await this.cacheManager.set(
      this.getKeyName(productId),
      rating,
      await this.configService.getOrThrow('CACHE_TTL'),
    );
    return rating;
  }

  async findAll(
    productId: string,
    { limit, cursor, minRating, maxRating, sortAsc }: FilterReviewArgs,
  ): Promise<PaginatedProductReview> {
    const filterExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};
    if (minRating) {
      filterExpressions.push('rating >= :minRating');
      expressionAttributeValues[':minRating'] = { N: minRating.toString() };
    }
    if (maxRating) {
      filterExpressions.push('rating <= :maxRating');
      expressionAttributeValues[':maxRating'] = { N: maxRating.toString() };
    }
    expressionAttributeValues[':productId'] = { S: productId };

    const scanParams =
      filterExpressions.length > 0
        ? {
            TableName,
            KeyConditionExpression: 'productId = :productId',
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
            KeyConditionExpression: 'productId = :productId',
            ExclusiveStartKey: cursor
              ? marshall({ productId: cursor })
              : undefined,
          };

    const data = await this.dynamodbService.client.query(scanParams);
    return {
      items: data.Items.map((item) => unmarshall(item) as ProductReview).sort(
        (a, b) => {
          return sortAsc ? a.rating - b.rating : b.rating - a.rating;
        },
      ),
      pagination: {
        limit,
        next: data.LastEvaluatedKey ? data.LastEvaluatedKey.productId.S : null,
      },
    };
  }

  async findOne(userId: string, productId: string) {
    const data = await this.dynamodbService.client.getItem({
      TableName,
      Key: marshall({ userId, productId }),
    });
    return data.Item ? unmarshall(data.Item) : null;
  }

  async remove(productId: string, userId: string) {
    await this.cacheManager.del(this.getKeyName(productId));
    return await this.dynamodbService.client.deleteItem({
      TableName,
      Key: marshall({ productId, userId }),
    });
  }
}
