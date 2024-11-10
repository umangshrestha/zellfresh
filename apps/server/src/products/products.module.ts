import { Module } from '@nestjs/common';
import { DynamodbModule } from 'src/common/dynamodb/dynamodb.module';
import { PrismaModule } from '../common/prisma/prisma.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { ProductsCacheService } from './products-cache.service';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsResolver, ProductsService, ProductsCacheService],
  imports: [ProductsModule, DynamodbModule, PrismaModule, ReviewsModule],
  exports: [ProductsService],
})
export class ProductsModule {}
