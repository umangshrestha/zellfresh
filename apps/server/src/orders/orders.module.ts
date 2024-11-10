import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { DynamodbModule } from 'src/common/dynamodb/dynamodb.module';

@Module({
  providers: [OrdersResolver, OrdersService],
  imports:[OrdersModule,DynamodbModule],
  exports:[OrdersService],
})
export class OrdersModule {}
