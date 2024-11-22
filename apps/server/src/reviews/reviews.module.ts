import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamodbModule } from '../common/dynamodb/dynamodb.module';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

@Module({
  providers: [ReviewsResolver, ReviewsService],
  imports: [DynamodbModule, ConfigModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
