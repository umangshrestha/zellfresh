import { Module } from '@nestjs/common';
import { DynamodbModule } from '../common/dynamodb/dynamodb.module';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';

@Module({
  providers: [ReviewsResolver, ReviewsService],
  imports: [DynamodbModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
