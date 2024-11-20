import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamodbModule } from 'src/common/dynamodb/dynamodb.module';
import { AddressesModule } from '../addresses/addresses.module';
import { CartsModule } from '../carts/carts.module';
import { PubSubModule } from '../common/pubsub/pub-sub.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { CheckoutService } from './checkout.service';
import { OrderItemResolver } from './order-item.resolver';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  providers: [
    OrdersResolver,
    OrdersService,
    CheckoutService,
    OrderItemResolver,
  ],
  imports: [
    PubSubModule,
    DynamodbModule,
    forwardRef(() => CartsModule),
    UsersModule,
    AddressesModule,
    ProductsModule,
    ConfigModule,
  ],
  exports: [OrdersService, CheckoutService],
})
export class OrdersModule {}
