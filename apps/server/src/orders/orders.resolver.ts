import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from '../auth/access-or-guest-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { Order } from './entities/order.entity';
import { PaymentMethod } from './entities/payment-method.enum';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
@UseGuards(AccessOrGuestTokenGuard)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order)
  checkout(
    @AuthUser() { sub }: Auth,
    @Args('paymentMethod', { type: () => PaymentMethod })
    paymentMethod: PaymentMethod,
  ) {
    return this.ordersService.checkout(sub, paymentMethod);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll(@AuthUser() { sub }: Auth) {
    return this.ordersService.findAll(sub);
  }

  @Query(() => Order, { name: 'order' })
  findOne(
    @AuthUser() { sub }: Auth,
    @Args('id', { type: () => Int }) orderId: string,
  ) {
    return this.ordersService.findOne(sub, orderId);
  }

  @Mutation(() => Order)
  cancelOrder(
    @AuthUser() { sub }: Auth,
    @Args('id', { type: () => Int }) orderId: string,
  ) {
    return this.ordersService.cancel(sub, orderId);
  }
}
