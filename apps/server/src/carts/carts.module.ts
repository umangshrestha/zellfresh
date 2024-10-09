import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { ProductsModule } from 'src/products/products.module';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';

@Module({
  providers: [CartsResolver, CartsService],
  imports: [ProductsModule, DynamodbModule],
})
export class CartsModule {}
