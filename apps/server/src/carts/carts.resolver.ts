import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from 'src/auth/access-or-guest-token.gaurd';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { CartsService } from './carts.service';
import { CartInput } from './dto/cart-input.input';
import { Cart } from './entities/cart.entity';
import {Subscription} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PubSubService } from '../common/pubsub/pub-sub.service';

export const pubSub = new PubSub();

@Resolver(() => Cart)
export class CartsResolver {
  constructor(
    private readonly cartsService: CartsService,
    private readonly  pubSubService: PubSubService) {}

  @Query(() => Cart, { name: 'cart' })
  @UseGuards(AccessOrGuestTokenGuard)
  async findCart(@AuthUser() { sub }: Auth) {
    const createdCart = await this.cartsService.createEmptyCart(sub, false);
    if (createdCart) 
      return createdCart;
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
  async clearCart(@AuthUser() { sub }: Auth) {
    const cart = await this.cartsService.createEmptyCart(sub);
    await this.pubSubService.updateCount({ cartCount: cart.count, sub });
    return cart;
  }

  @Subscription(() => Int, {
    nullable: true,
    filter: (payload, variables, context) => {
      return payload.sub === context.req.connectionParams.sub;
    },
    resolve: (payload) => {
      return payload.cartCount || 0;
    }
  })
  async cartCount(@Context() context: any) {
    const count = await  this.cartsService.getCount(context.req.connectionParams.sub);
    setTimeout(() => pubSub.publish('cartUpdated', { cartCount: count, sub: context.req.connectionParams.sub }), 0);
    return pubSub.asyncIterableIterator('cartUpdated');
  }
}
