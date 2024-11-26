import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenGuard } from '../auth/access-token/access-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { FilterReviewArgs } from './dto/filter-review.args';
import { FeedbackInput } from './dto/feedback.input';
import { ProductReview } from './entities/product-review.entity';
import { ReviewsService } from './reviews.service';

@Resolver(() => ProductReview)
@UseGuards(AccessTokenGuard)
export class ReviewsResolver {
  constructor(
    private readonly ratingsService: ReviewsService) {}

  @Mutation(() => ProductReview)
  submitFeedback(
    @AuthUser() { sub }: Auth,
    @Args('productId') productId: string,
    @Args('feedback') putReviewInput: FeedbackInput,
  ) {
    return this.ratingsService.put(sub, productId, putReviewInput);
  }

  @Query(() => [ProductReview], { name: 'reviews' })
  findAll(
    @Args('productId') productId: string,
    @Args() filter: FilterReviewArgs,
  ) {
    return this.ratingsService.findAll(productId, filter);
  }

  @Query(() => ProductReview, { name: 'review', nullable: true })
  findOne(@AuthUser() { sub }: Auth, @Args('productId') productId: string) {
    return this.ratingsService.findOne(sub, productId);
  }
}
