import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenGuard } from 'src/auth/access-token/access-token.gaurd';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { GuestTokenGuard } from 'src/auth/guest-token/guest-token.gaurd';
import { CartsService } from './carts.service';
import { CartInput } from './dto/cart-input.input';
import { Cart } from './entities/cart.entity';

@Resolver(() => Cart)
@UseGuards(AccessTokenGuard, GuestTokenGuard)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Query(() => Cart, { name: 'cart' })
  findAll(@AuthUser() { sub }: Auth) {
    return this.cartsService.getCart(sub);
  }

  // @Query(() => [Cart], { name: 'cart' })
  // findOne(
  //   @AuthUser() { sub }: Auth,
  //   @Args('id', { type: () => String }) productId: string,
  // ) {
  //   return this.cartsService.getCartItem(sub, productId);
  // }

  @Mutation(() => Cart)
  addItemToCart(
    @AuthUser() { sub }: Auth,
    @Args('cartInput') cartItem: CartInput,
  ) {
    return this.cartsService.addItemToCart(sub, cartItem);
  }

  @Mutation(() => Cart)
  clearCart(@AuthUser() { sub }: Auth) {
    this.cartsService.removeAll(sub);
  }
}
