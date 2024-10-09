import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { UseGuards } from '@nestjs/common';
import { AccessOrGuestTokenGuard } from 'src/auth/guards/AccessOrGuestTokenGuard';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { CartInput } from './dto/cart-input.input';

@Resolver(() => Cart)
@UseGuards(AccessOrGuestTokenGuard)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Query(() => [Cart], { name: 'carts' })
  find(@AuthUser() { sub }: Auth) {
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
  clearCart(@AuthUser() { sub }: Auth): boolean {
    try {
      this.cartsService.removeAll(sub);
      return true;
    } catch (error) {
      return false;
    }
  }
}
