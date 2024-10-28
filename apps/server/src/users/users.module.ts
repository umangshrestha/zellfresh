import { Module } from '@nestjs/common';
import { DynamodbModule } from '../common/dynamodb/dynamodb.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [DynamodbModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
