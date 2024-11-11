import { forwardRef, Module } from '@nestjs/common';
import { DynamodbModule } from '../common/dynamodb/dynamodb.module';
import { UsersModule } from '../users/users.module';
import { AddressesResolver } from './addresses.resolver';
import { AddressesService } from './addresses.service';

@Module({
  providers: [AddressesResolver, AddressesService],
  imports: [DynamodbModule, forwardRef(() => UsersModule)],
  exports: [AddressesService],
})
export class AddressesModule {}
