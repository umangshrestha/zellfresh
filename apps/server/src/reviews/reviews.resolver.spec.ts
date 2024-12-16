import { Test, TestingModule } from '@nestjs/testing';
import { Auth } from '../auth/entities/auth.entity';
import { FeedbackInput } from './dto/feedback.input';
import { FilterReviewArgs } from './dto/filter-review.args';
import { PaginatedProductReview } from './entities/paginated-product-review.entity';
import { ProductReview } from './entities/product-review.entity';
import { Rating } from './entities/rating.entity';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

describe('ReviewsResolver', () => {
  let resolver: ReviewsResolver;
  let reviewsService: ReviewsService;

  const userId = '1';

  const auth: Auth = {
    sub: userId,
    role: 'guest',
    email: 'email',
    name: 'name',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsResolver,
        {
          provide: ReviewsService,
          useValue: {
            put: jest.fn(),
            getRating: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ReviewsResolver>(ReviewsResolver);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createReview', () => {
    it('should create a new review', async () => {
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

      jest.spyOn(reviewsService, 'put').mockResolvedValue(review);

      const result = await resolver.submitFeedback(
        auth,
        productId,
        feedbackInput,
      );

      expect(result).toEqual(review);
      expect(reviewsService.put).toHaveBeenCalledWith(
        userId,
        productId,
        feedbackInput,
      );
    });
  });

  describe('getRating', () => {
    it('should return the rating for a product', async () => {
      const productId = 'product-1';
      const rating: Rating = { rating: 4.5, count: 10 };
      jest.spyOn(reviewsService, 'findOne').mockResolvedValue(rating);
      const result = await resolver.findOne(auth, productId);
      expect(result).toEqual(rating);
      expect(reviewsService.findOne).toHaveBeenCalledWith(userId, productId);
    });
  });

  describe('findAllReviews', () => {
    it('should return paginated reviews', async () => {
      const productId = 'product-1';
      const filterArgs: FilterReviewArgs = {
        limit: 10,
        cursor: null,
        minRating: 4,
        maxRating: 5,
        sortAsc: true,
      };
      const paginatedReviews: PaginatedProductReview = {
        items: [],
        pagination: { limit: 10, next: null },
      };

      jest.spyOn(reviewsService, 'findAll').mockResolvedValue(paginatedReviews);

      const result = await resolver.findAll(productId, filterArgs);

      expect(result).toEqual(paginatedReviews);
      expect(reviewsService.findAll).toHaveBeenCalledWith(
        productId,
        filterArgs,
      );
    });
  });

  describe('findReview', () => {
    it('should return a single review', async () => {
      const productId = 'product-1';
      const review: ProductReview = {
        userId,
        productId,
        rating: 5,
        comment: 'Great!',
        createdAt: 'date',
        updatedAt: 'date',
      };
      jest.spyOn(reviewsService, 'findOne').mockResolvedValue(review);

      const result = await resolver.findOne(auth, productId);

      expect(result).toEqual(review);
      expect(reviewsService.findOne).toHaveBeenCalledWith(userId, productId);
    });
  });
});
