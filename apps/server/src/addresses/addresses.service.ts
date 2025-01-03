import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';
import { FilterLimitArgs } from 'src/common/dto/filter-limit.args';
import { v4 as uuid } from 'uuid';
import { DynamodbService } from '../common/dynamodb/dynamodb.service';
import { get_date_time_string } from '../common/get-date-time';
import { UsersService } from '../users/users.service';
import { PutAddressInput } from './dto/put-address.input';
import { Address } from './entities/address.entity';
const TableName = 'ADDRESS_TABLE';

@Injectable()
export class AddressesService {
  constructor(
    private readonly dynamodbService: DynamodbService,
    private readonly usersService: UsersService,
  ) {}

  async putAddress(userId: string, putAddressInput: PutAddressInput) {
    const newAddress = new Address();
    if (!putAddressInput.addressId) {
      newAddress.addressId = uuid();
    } else {
      newAddress.addressId = putAddressInput.addressId;
    }
    newAddress.userId = userId;
    newAddress.city = putAddressInput.city;
    newAddress.country = putAddressInput.country;
    newAddress.state = putAddressInput.state;
    newAddress.street = putAddressInput.street;
    newAddress.zip = putAddressInput.zip;
    newAddress.updatedAt = get_date_time_string();
    newAddress.apt = putAddressInput.apt || '';
    newAddress.additionalInfo = putAddressInput.additionalInfo || '';
    await this.dynamodbService.client.putItem({
      TableName,
      Item: marshall({ ...newAddress }),
    });
    const defaultAddressId =
      await this.usersService.getDefaultAddressId(userId);
    if (!defaultAddressId) {
      await this.usersService.updateDefaultAddress(
        userId,
        newAddress.addressId,
      );
    }
    return newAddress;
  }

  async findAll(userId: string, filter: FilterLimitArgs) {
    const addresses = await this.dynamodbService.client.query({
      TableName,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: marshall({
        ':userId': userId,
      }),
      Limit: filter.limit,
    });
    if (!addresses.Items) {
      return [];
    }
    return addresses.Items.map((item) => unmarshall(item));
  }

  async findOne(userId: string, addressId: string) {
    const address = await this.dynamodbService.client.getItem({
      TableName,
      Key: marshall({ userId, addressId }),
    });
    if (!address.Item) {
      return null;
    }
    return unmarshall(address.Item) as Address;
  }

  async delete(userId: string, addressId: string) {
    const defaultAddressId =
      await this.usersService.getDefaultAddressId(userId);
    if (defaultAddressId === addressId) {
      throw new Error('Cannot delete default address');
    }
    await this.dynamodbService.client.deleteItem({
      TableName,
      Key: marshall({ userId, addressId }),
    });
  }

  async updateDefaultAddress(userId: string, addressId: string) {
    const address = await this.findOne(userId, addressId);
    if (!address) {
      throw new Error('Address not found');
    }
    await this.usersService.updateDefaultAddress(userId, addressId);
    return address;
  }
}
