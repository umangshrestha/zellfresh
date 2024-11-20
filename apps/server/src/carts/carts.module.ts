import { forwardRef, Module } from '@nestjs/common';
import { DynamodbModule } from 'src/common/dynamodb/dynamodb.module';
import { ProductsModule } from 'src/products/products.module';
import { PubSubModule } from '../common/pubsub/pub-sub.module';
import { OrdersModule } from '../orders/orders.module';
import { CartsItemResolver } from './cart-item.resolver';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';

@Module({
  providers: [CartsResolver, CartsService, CartsItemResolver],
  imports: [
    ProductsModule,
    DynamodbModule,
    PubSubModule,
    forwardRef(() => OrdersModule),
  ],
  exports: [CartsService],
})
export class CartsModule {}
