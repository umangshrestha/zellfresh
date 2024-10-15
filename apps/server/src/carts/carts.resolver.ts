import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from 'src/auth/access-or-guest-token.gaurd';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { CartsService } from './carts.service';
import { CartInput } from './dto/cart-input.input';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

@Resolver(() => Cart)
@UseGuards(AccessOrGuestTokenGuard)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Query(() => Cart, { name: 'cart' })
  findAll(@AuthUser() { sub }: Auth) {
    return this.cartsService.getCart(sub);
  }

  @Query(() => CartItem, { name: 'cartItem' })
  findCartItem(
    @AuthUser() { sub }: Auth,
    @Args('productId') productId: string,
  ) {
    return this.cartsService.getCartItem(sub, productId);
  }

  @Mutation(() => Cart)
  addItemToCart(
    @AuthUser() { sub }: Auth,
    @Args('cartInput') cartItem: CartInput,
  ) {
    return this.cartsService.addItemToCart(sub, cartItem);
  }

  @Mutation(() => Cart)
  clearCart(@AuthUser() { sub }: Auth) {
    return this.cartsService.removeAll(sub);
  }
}
