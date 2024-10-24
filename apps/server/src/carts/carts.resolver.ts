import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from 'src/auth/access-or-guest-token.gaurd';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { CartsService } from './carts.service';
import { CartInput } from './dto/cart-input.input';
import { Cart } from './entities/cart.entity';

@Resolver(() => Cart)
@UseGuards(AccessOrGuestTokenGuard)
export class CartsResolver {
  private readonly loggerService = new Logger(CartsResolver.name);

  constructor(private readonly cartsService: CartsService) {}

  @Query(() => Cart, { name: 'cart' })
  findCart(@AuthUser() { sub }: Auth) {
    return this.cartsService.getCart(sub);
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
    return this.cartsService.createEmptyCart(sub, true);
  }
}
