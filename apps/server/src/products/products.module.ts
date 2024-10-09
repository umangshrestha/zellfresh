import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [ProductsModule, DynamodbModule],
  exports: [ProductsService],
})
export class ProductsModule {}
