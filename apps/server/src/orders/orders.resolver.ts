import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from '../auth/access-or-guest-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { Role } from '../auth/types/role.enum';
import { PubSubService } from '../common/pubsub/pub-sub.service';
import { FeedbackInput } from '../reviews/dto/feedback.input';
import { OrderReview } from '../reviews/entities/order-review.entity';
import { CheckoutService } from './checkout.service';
import { DeliveryStatus } from './entities/delivery-status.enum';
import { FilterOrderArgs } from './entities/filter-orders.args';
import { Order } from './entities/order.entity';
import { PaginatedOrder } from './entities/paginated-order.entry';
import { PaymentMethod } from './entities/payment-method.enum';
import { OrdersService } from './orders.service';

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
    await this.pubSubService.updateCount({ cartCount: 0, sub });
    return order;
  }

  @Query(() => PaginatedOrder, { name: 'orders' })
  findAll(@AuthUser() { sub, role }: Auth, @Args() filter: FilterOrderArgs) {
    if (role === Role.ADMIN) {
      return this.ordersService.findAll(null, filter);
    }
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

  @Mutation(() => OrderReview)
  submitOrderFeedback(
    @AuthUser() { sub }: Auth,
    @Args('orderId') orderId: string,
    @Args('feedback') putReviewInput: FeedbackInput,
  ) {
    return this.ordersService.putFeedback(sub, orderId, putReviewInput);
  }

  @ResolveField(() => Boolean)
  async canCancel(@Parent() data: Order) {
    try {
      await this.ordersService.canCancel(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => Order, {
    description: 'Admin User can change the delivery status of an order',
  })
  async changeOrderStatus(
    @AuthUser() { role }: Auth,
    @Args('userId', { type: () => String }) userId: string,
    @Args('orderId', { type: () => String }) orderId: string,
    @Args('status', { type: () => DeliveryStatus }) status: DeliveryStatus,
  ) {
    if (role !== Role.ADMIN) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.ordersService.changeDeliveryStatus(userId, orderId, status);
  }
}
