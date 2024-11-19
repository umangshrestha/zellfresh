import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DynamodbModule } from '../dynamodb/dynamodb.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DynamoDBHealthIndicator } from './dynamodb.health-indicator';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  providers: [DynamoDBHealthIndicator],
  imports: [TerminusModule, PrismaModule, DynamodbModule],
})
export class HealthModule {}
