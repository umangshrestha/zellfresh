import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from '../auth/access-or-guest-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { FilterOrderArgs } from './entities/filter-orders.args';
import { Order, OrderItem } from './entities/order.entity';
import { PaginatedOrder } from './entities/paginated-order.entry';
import { PaymentMethod } from './entities/payment-method.enum';
import { OrdersService } from './orders.service';
import { PubSubService } from '../common/pubsub/pub-sub.service';
import { CheckoutService } from './checkout.service';


@Resolver(() => Order)
@UseGuards(AccessOrGuestTokenGuard)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly pubSubService: PubSubService,
    private readonly checkoutService: CheckoutService,
  ) {}

  @Mutation(() => Order)
  async checkout(
    @AuthUser() { sub }: Auth,
    @Args('paymentMethod', { type: () => PaymentMethod })
    paymentMethod: PaymentMethod,
  ) {
    const order = await this.checkoutService.checkout(sub, paymentMethod);
    await this.pubSubService.updateCount({cartCount: 0, sub});
    return order;
  }

  @Query(() => PaginatedOrder, { name: 'orders' })
  findAll(@AuthUser() { sub }: Auth, @Args() filter: FilterOrderArgs) {
    return this.ordersService.findAll(sub, filter);
  }

  @Query(() => Order, { name: 'order' })
  findOne(
    @AuthUser() { sub }: Auth,
    @Args('orderId', { type: () => String }) orderId: string,
  ) {
    return this.ordersService.findOne(sub, orderId);
  }

  @Mutation(() => Order)
  cancelOrder(
    @AuthUser() { sub }: Auth,
    @Args('orderId', { type: () => String }) orderId: string,
  ) {
    return this.ordersService.cancel(sub, orderId);
  }
}
