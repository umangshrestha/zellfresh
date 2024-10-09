import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamodbService } from './dynamodb.service';

@Module({
  imports: [ConfigModule],
  providers: [ConfigService, DynamodbService],
  exports: [DynamodbService],
})
export class DynamodbModule {}
