import { Module } from '@nestjs/common';
import { AddressesModule } from '../addresses/addresses.module';
import { DynamodbModule } from '../common/dynamodb/dynamodb.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [DynamodbModule, AddressesModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
