import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from 'src/auth/access-or-guest-token.gaurd';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { OrderItem } from './entities/order.entity';

@Resolver(() => OrderItem)
@UseGuards(AccessOrGuestTokenGuard)
export class OrderItemResolver {
  constructor(private readonly productsService: ProductsService) {}

  @ResolveField(() => Product, { nullable: true })
  product(@Parent() { productId }: OrderItem) {
    return this.productsService.findOne(productId);
  }
}
