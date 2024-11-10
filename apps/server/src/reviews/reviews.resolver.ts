import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenGuard } from '../auth/access-token/access-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { FilterReviewArgs } from './dto/filter-review.args';
import { PutReviewInput } from './dto/put-review.input';
import { Review } from './entities/review.entity';
import { ReviewsService } from './reviews.service';

@Resolver(() => Review)
@UseGuards(AccessTokenGuard)
export class ReviewsResolver {
  constructor(private readonly ratingsService: ReviewsService) {}

  @Mutation(() => Review)
  putRating(
    @AuthUser() { sub }: Auth,
    @Args('productId') productId: string,
    @Args('putReviewInput') putReviewInput: PutReviewInput,
  ) {
    return this.ratingsService.put(sub, productId, putReviewInput);
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll(
    @Args('productId') productId: string,
    @Args() filter: FilterReviewArgs,
  ) {
    return this.ratingsService.findAll(productId, filter);
  }

  @Query(() => Review, { name: 'review' })
  findOne(@AuthUser() { sub }: Auth, @Args('productId') productId: string) {
    return this.ratingsService.findOne(sub, productId);
  }

  @Mutation(() => Review)
  removeRating(
    @AuthUser() { sub }: Auth,
    @Args('productId') productId: string,
  ) {
    return this.ratingsService.remove(sub, productId);
  }
}
