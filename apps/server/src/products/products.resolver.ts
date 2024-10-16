import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { PaginatedProduct } from './entities/paginated-product.entry';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => PaginatedProduct, { name: 'products' })
  findAll(
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @Args('cursor', { type: () => String, nullable: true }) cursor: string,
  ) {
    return this.productsService.findAll(limit, cursor);
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(
    @Args('productId', new ParseUUIDPipe({ version: '4' })) productId: string,
  ) {
    return this.productsService.findOne(productId);
  }

  @Mutation(() => String)
  removeProduct(
    @Args('productId', new ParseUUIDPipe({ version: '4' })) productId: string,
  ) {
    return this.productsService.remove(productId);
  }
}
