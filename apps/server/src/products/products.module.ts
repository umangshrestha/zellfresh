import { Module } from '@nestjs/common';
import { DynamodbModule } from 'src/dynamodb/dynamodb.module';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [ProductsModule, DynamodbModule],
  exports: [ProductsService],
})
export class ProductsModule {}
