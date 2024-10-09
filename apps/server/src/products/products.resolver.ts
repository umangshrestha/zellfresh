import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { ParseUUIDPipe } from '@nestjs/common';
import { PaginatedProduct } from './entities/paginatedProduct.entry';

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
  findOne(@Args('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => String)
  removeProduct(@Args('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productsService.remove(id);
  }
}
