import { Module } from '@nestjs/common';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';
import { ProductsModule } from 'src/products/products.module';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';

@Module({
  providers: [CartsResolver, CartsService],
  imports: [ProductsModule, DynamodbModule],
  exports: [CartsService],
})
export class CartsModule {}
