import { Module } from '@nestjs/common';
import { DynamodbModule } from 'src/common/dynamodb/dynamodb.module';
import { ProductsModule } from 'src/products/products.module';
import { CartsItemResolver } from './cart-item.resolver';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';

@Module({
  providers: [CartsResolver, CartsService, CartsItemResolver],
  imports: [ProductsModule, DynamodbModule],
  exports: [CartsService],
})
export class CartsModule {}
