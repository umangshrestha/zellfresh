import { Module } from '@nestjs/common';
import { DynamodbModule } from '../common/dynamodb/dynamodb.module';
import { AddressesResolver } from './addresses.resolver';
import { AddressesService } from './addresses.service';

@Module({
  providers: [AddressesResolver, AddressesService],
  imports: [DynamodbModule],
  exports: [AddressesService],
})
export class AddressesModule {}
