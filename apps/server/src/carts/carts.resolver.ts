import { Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AccessOrGuestTokenGuard } from 'src/auth/access-or-guest-token.gaurd';
import { AuthUser } from 'src/auth/auth.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { PaginatedProduct } from 'src/products/entities/paginated-product.entry';
import { ProductsService } from 'src/products/products.service';
import { CartsService } from './carts.service';
import { CartInput } from './dto/cart-input.input';
import { Cart } from './entities/cart.entity';

const pubSub = new PubSub();

@Resolver(() => Cart)
@UseGuards(AccessOrGuestTokenGuard)
export class CartsResolver {
  private readonly loggerService = new Logger(CartsResolver.name);

  constructor(
    private readonly cartsService: CartsService,
    private readonly productsService: ProductsService,
  ) {}

  @Query(() => PaginatedProduct, { name: 'carts' })
  findAll(
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @Args('cursor', { type: () => String, nullable: true }) cursor: string,
  ) {
    return this.cartsService.findAll(limit, cursor);
  }

  @Query(() => Cart, { name: 'cart' })
  async findCart(@AuthUser() { sub }: Auth) {
    const output = await this.cartsService.getCart(sub);
    pubSub.publish('cartCountUpdated', { cartUpdated: output, sub });
    return output;
  }

  @Mutation(() => Cart)
  addItemToCart(
    @AuthUser() { sub }: Auth,
    @Args('cartInput') cartItem: CartInput,
  ) {
    const output = this.cartsService.addItemToCart(sub, cartItem);
    pubSub.publish('cartCountUpdated', { cartUpdated: output, sub });
    return output;
  }

  @Mutation(() => Cart)
  clearCart(@AuthUser() { sub }: Auth) {
    const output = this.cartsService.createEmptyCart(sub, true);
    pubSub.publish('cartCountUpdated', { cartUpdated: output, sub });
    return output;
  }

  @Subscription(() => Int, {
    name: 'cartCountUpdated',
    filter: (payload, variables, context) => {
      return payload.sub === context.req.user.sub;
    },
  })
  cartUpdated(@AuthUser() { sub }: Auth) {
    this.loggerService.log(`Subscribed to cart count for user: ${sub}`);
    return pubSub.asyncIterator('cartCountUpdated');
  }
}
