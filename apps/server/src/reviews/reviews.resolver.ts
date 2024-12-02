import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from '../auth/access-or-guest-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { FeedbackInput } from './dto/feedback.input';
import { FilterReviewArgs } from './dto/filter-review.args';
import { ProductReview } from './entities/product-review.entity';
import { ReviewsService } from './reviews.service';

@Resolver(() => ProductReview)
@UseGuards(AccessOrGuestTokenGuard)
export class ReviewsResolver {
  constructor(private readonly ratingsService: ReviewsService) {}

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
