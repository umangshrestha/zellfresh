import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { DynamoDBHealthIndicator } from './dynamodb.health-indicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
    private readonly prismaService: PrismaService,
    private memory: MemoryHealthIndicator,
    private dynamodb: DynamoDBHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prisma.pingCheck('products-cache', this.prismaService),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
      () => this.dynamodb.isHealthy('products', 'PRODUCTS_TABLE'),
      () => this.dynamodb.isHealthy('users', 'USERS_TABLE'),
      () => this.dynamodb.isHealthy('carts', 'CARTS_TABLE'),
      () => this.dynamodb.isHealthy('orders', 'ORDERS_TABLE'),
      () => this.dynamodb.isHealthy('reviews', 'REVIEWS_TABLE'),
    ]);
  }
}
