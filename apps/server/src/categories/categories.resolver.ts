import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category', nullable: true })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.categoriesService.findOne(name);
  }

  @ResolveField(() => Boolean)
  isAvailable(@Parent() { name }: Category) {
    return this.productsService.checkIfCategoryExists(name);
  }
}
