import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { FilterProductsInput } from './dto/filter-product.input';
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
  findAll(@Args('filter') filter: FilterProductsInput) {
    return this.productsService.findAll(filter);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('productId') productId: string) {
    return this.productsService.findOne(productId);
  }

  @Mutation(() => String)
  removeProduct(@Args('productId') productId: string) {
    return this.productsService.remove(productId);
  }
}
