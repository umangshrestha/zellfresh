import { Module } from '@nestjs/common';
import { DynamodbModule } from 'src/common/dynamodb/dynamodb.module';
import { AddressesModule } from '../addresses/addresses.module';
import { CartsModule } from '../carts/carts.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  providers: [OrdersResolver, OrdersService],
  imports: [
    OrdersModule,
    DynamodbModule,
    CartsModule,
    UsersModule,
    AddressesModule,
    ProductsModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
