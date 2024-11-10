import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable, Logger } from '@nestjs/common';
import { DynamodbService } from '../common/dynamodb/dynamodb.service';
import { get_date_time_string } from '../common/get-date-time';
import { FilterReviewArgs } from './dto/filter-review.args';
import { PutReviewInput } from './dto/put-review.input';
import { PaginatedReview } from './entities/paginated-review.entity';
import { Rating } from './entities/rating.entity';
import { Review } from './entities/review.entity';
const TableName = 'REVIEWS_TABLE';

@Injectable()
export class ReviewsService {
  private readonly loggerService = new Logger(ReviewsService.name);

  constructor(private readonly dynamodbService: DynamodbService) {}

  async put(userId: string, productId: string, putReviewInput: PutReviewInput) {
    const review = new Review();
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
    const rating = new Rating();

    try {
      const data = await this.dynamodbService.client.query({
        TableName,
        KeyConditionExpression: 'productId = :productId',
        ExpressionAttributeValues: {
          ':productId': { S: productId },
        },
      });
      const reviews = data.Items.map((item) => unmarshall(item) as Review);
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
    return rating;
  }

  async findAll(
    productId: string,
    { limit, cursor, minRating, maxRating, sortAsc }: FilterReviewArgs,
  ): Promise<PaginatedReview> {
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
      items: data.Items.map((item) => unmarshall(item) as Review).sort(
        (a, b) => {
          return sortAsc ? a.rating - b.rating : b.rating - a.rating;
        },
      ),
      pagination: {
        limit,
        prev: cursor,
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

  remove(productId: string, userId: string) {
    return this.dynamodbService.client.deleteItem({
      TableName,
      Key: marshall({ productId, userId }),
    });
  }
}
