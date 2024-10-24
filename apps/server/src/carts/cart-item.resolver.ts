import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from 'src/auth/access-or-guest-token.gaurd';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { CartsService } from './carts.service';
import { CartItem } from './entities/cart-item.entity';

@Resolver(() => CartItem)
@UseGuards(AccessOrGuestTokenGuard)
export class CartsItemResolver {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
  ) {}

  @ResolveField(() => Product, { nullable: true })
  product(@Parent() { productId }: CartItem) {
    return this.productsService.findOne(productId);
  }

  @Query(() => CartItem)
  cartItem(@AuthUser() { sub }: Auth, @Args('productId') productId: string) {
    return this.cartsService.getCartItem(sub, productId);
  }
}
