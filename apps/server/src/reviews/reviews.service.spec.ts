import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { DynamodbService } from '../common/dynamodb/dynamodb.service';
import { get_date_time_string } from '../common/get-date-time';
import { FeedbackInput } from './dto/feedback.input';
import { FilterReviewArgs } from './dto/filter-review.args';
import { ProductReview } from './entities/product-review.entity';
import { Rating } from './entities/rating.entity';
import { ReviewsService } from './reviews.service';

jest.mock('../common/get-date-time', () => ({
  get_date_time_string: jest.fn(),
}));

describe('ReviewsService', () => {
  let service: ReviewsService;
  let dynamodbService: DynamodbService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: DynamodbService,
          useValue: {
            client: {
              putItem: jest.fn(),
              query: jest.fn(),
              getItem: jest.fn(),
              deleteItem: jest.fn(),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockResolvedValue(3600),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    dynamodbService = module.get<DynamodbService>(DynamodbService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  describe('put', () => {
    it('should create a new review', async () => {
      const userId = '1';
      const productId = 'product-1';
      const feedbackInput: FeedbackInput = {
        rating: 5,
        comment: 'Great product!',
      };
      const review = new ProductReview();
      review.userId = userId;
      review.productId = productId;
      review.rating = feedbackInput.rating;
      review.comment = feedbackInput.comment;
      review.createdAt = 'mocked_date_time';
      review.updatedAt = 'mocked_date_time';

      (get_date_time_string as jest.Mock).mockReturnValue('mocked_date_time');
      jest
        .spyOn(dynamodbService.client, 'putItem')
        .mockResolvedValue({} as never);

      const result = await service.put(userId, productId, feedbackInput);

      expect(result).toEqual(review);
      expect(dynamodbService.client.putItem).toHaveBeenCalledWith({
        TableName: 'REVIEWS_TABLE',
        ConditionExpression:
          'attribute_not_exists(productId) AND attribute_not_exists(userId)',
        Item: marshall({ ...review }),
      });
      expect(cacheManager.del).toHaveBeenCalledWith(`rating-${productId}`);
    });

    it('should return null if review already exists', async () => {
      const userId = '1';
      const productId = 'product-1';
      const feedbackInput: FeedbackInput = {
        rating: 5,
        comment: 'Great product!',
      };

      jest
        .spyOn(dynamodbService.client, 'putItem')
        .mockRejectedValue(
          new ConditionalCheckFailedException({} as never) as never,
        );

      const result = await service.put(userId, productId, feedbackInput);

      expect(result).toBeNull();
    });
  });

  describe('getRating', () => {
    it('should return cached rating if available', async () => {
      const productId = 'product-1';
      const cachedRating: Rating = { rating: 4.5, count: 10 };

      jest.spyOn(cacheManager, 'get').mockResolvedValue(cachedRating);

      const result = await service.getRating(productId);

      expect(result).toEqual(cachedRating);
    });

    it('should calculate and cache rating if not available', async () => {
      const productId = 'product-1';
      const reviews: ProductReview[] = [
        {
          userId: '1',
          productId,
          rating: 5,
          comment: 'Great!',
          createdAt: 'date',
          updatedAt: 'date',
        },
        {
          userId: '2',
          productId,
          rating: 4,
          comment: 'Good',
          createdAt: 'date',
          updatedAt: 'date',
        },
      ];

      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(dynamodbService.client, 'query').mockResolvedValue({
        Items: reviews.map((review) => marshall(review)),
      } as never);

      const result = await service.getRating(productId);

      expect(result).toEqual({ rating: 4.5, count: 2 });
      expect(cacheManager.set).toHaveBeenCalledWith(
        `rating-${productId}`,
        { rating: 4.5, count: 2 },
        3600,
      );
    });
  });

  describe('findAll', () => {
    it('should return paginated reviews', async () => {
      const productId = 'product-1';
      const filterArgs: FilterReviewArgs = {
        limit: 10,
        cursor: null,
        minRating: 4,
        maxRating: 5,
        sortAsc: true,
      };
      const reviews: ProductReview[] = [
        {
          userId: '2',
          productId,
          rating: 4,
          comment: 'Good',
          createdAt: 'date',
          updatedAt: 'date',
        },
        {
          userId: '1',
          productId,
          rating: 5,
          comment: 'Great!',
          createdAt: 'date',
          updatedAt: 'date',
        },
      ];

      jest.spyOn(dynamodbService.client, 'query').mockResolvedValue({
        Items: reviews.map((review) => marshall(review)),
        LastEvaluatedKey: { productId: { S: 'product-1' } },
      } as never);

      const result = await service.findAll(productId, filterArgs);

      expect(result).toEqual({
        items: reviews,
        pagination: { limit: 10, next: 'product-1' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single review', async () => {
      const userId = '1';
      const productId = 'product-1';
      const review: ProductReview = {
        userId,
        productId,
        rating: 5,
        comment: 'Great!',
        createdAt: 'date',
        updatedAt: 'date',
      };

      jest.spyOn(dynamodbService.client, 'getItem').mockResolvedValue({
        Item: marshall(review),
      } as never);

      const result = await service.findOne(userId, productId);

      expect(result).toEqual(review);
    });
  });

  describe('remove', () => {
    it('should delete a review', async () => {
      const userId = '1';
      const productId = 'product-1';

      jest
        .spyOn(dynamodbService.client, 'deleteItem')
        .mockResolvedValue({} as never);

      await service.remove(productId, userId);

      expect(dynamodbService.client.deleteItem).toHaveBeenCalledWith({
        TableName: 'REVIEWS_TABLE',
        Key: marshall({ productId, userId }),
      });
      expect(cacheManager.del).toHaveBeenCalledWith(`rating-${productId}`);
    });
  });
});
