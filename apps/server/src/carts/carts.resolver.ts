import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from 'src/auth/access-or-guest-token.gaurd';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { PubSubService } from '../common/pubsub/pub-sub.service';
import { CheckoutService } from '../orders/checkout.service';
import { CheckoutDetails } from '../orders/entities/checkout-details.entity';
import { CartsService } from './carts.service';
import { CartInput } from './dto/cart-input.input';
import { Cart } from './entities/cart.entity';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(
    private readonly cartsService: CartsService,
    private readonly checkoutService: CheckoutService,
    private readonly pubSubService: PubSubService,
  ) {}

  @Query(() => Cart, { name: 'cart' })
  @UseGuards(AccessOrGuestTokenGuard)
  async findCart(@AuthUser() { sub }: Auth) {
    const createdCart = await this.cartsService.createEmptyCart(sub, { overwrite: false });
    if (createdCart) return createdCart;
    const cart = await this.cartsService.getCart(sub);
    await this.pubSubService.updateCount({ cartCount: cart.count, sub });
    return cart;
  }

  @Mutation(() => Cart)
  @UseGuards(AccessOrGuestTokenGuard)
  async addItemToCart(
    @AuthUser() { sub }: Auth,
    @Args('cartInput') cartItem: CartInput,
  ) {
    const cart = await this.cartsService.addItemToCart(sub, cartItem);
    await this.pubSubService.updateCount({ cartCount: cart.count, sub });
    return cart;
  }

  @Mutation(() => Cart)
  @UseGuards(AccessOrGuestTokenGuard)
  async clearCart(@AuthUser() { sub, role }: Auth) {
    const cart = await this.cartsService.createEmptyCart(sub, { overwrite: true});
    await this.pubSubService.updateCount({ cartCount: cart.count, sub });
    return cart;
  }

  @Subscription(() => Int, {
    filter: (payload, variables, context) => {
      return payload.sub === context.req.connectionParams.sub;
    },
    resolve: (payload) => {
      return payload?.cartCount || 0;
    },
  })
  async cartCount(@Context() context: any) {
    const count = await this.cartsService.getCount(
      context.req.connectionParams.sub,
    );
    setTimeout(
      () =>
        this.pubSubService.updateCount({
          cartCount: count,
          sub: context.req.connectionParams.sub,
        }),
      0,
    );
    return this.pubSubService.asyncCartIterator();
  }

  @ResolveField(() => CheckoutDetails)
  checkoutDetails(@Parent() cart: Cart) {
    return this.checkoutService.getCheckoutDetails(cart.items);
  }
}
