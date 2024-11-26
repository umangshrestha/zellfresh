import { Logger } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FilterReviewArgs } from '../reviews/dto/filter-review.args';
import { ProductReview } from '../reviews/entities/product-review.entity';
import { ReviewsService } from '../reviews/reviews.service';
import { FilterProductsArgs } from './dto/filter-product.args';
import { PaginatedProduct } from './entities/paginated-product.entry';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  private readonly logger = new Logger(ProductsResolver.name);
  constructor(
    private readonly productsService: ProductsService,
    private readonly reviewService: ReviewsService,
  ) {}

  @Query(() => PaginatedProduct, { name: 'products' })
  findAll(@Args() filter: FilterProductsArgs) {
    return this.productsService.findAll(filter);
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args('productId') productId: string) {
    return this.productsService.findOne(productId);
  }

  @ResolveField(() => [Product])
  rating(@Parent() { productId }: Product) {
    return this.reviewService.getRating(productId);
  }

  @ResolveField(() => [ProductReview])
  reviews(@Parent() { productId }: Product, filter: FilterReviewArgs) {
    return this.reviewService.findAll(productId, filter);
  }
}
