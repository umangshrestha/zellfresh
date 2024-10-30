import { marshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DynamodbService } from '../common/dynamodb/dynamodb.service';
import { get_date_time_string } from '../common/get-date-time';
import { PutAddressInput } from './dto/put-address.input';
import { Address } from './entities/address.entity';

const TableName = 'ADDRESS_TABLE';

@Injectable()
export class AddressesService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async putAddress(userId: string, putAddressInput: PutAddressInput) {
    const newAddress = new Address();
    if (!putAddressInput.addressId) {
      putAddressInput.addressId = uuid();
    }
    newAddress.userId = userId;
    newAddress.city = putAddressInput.city;
    newAddress.country = putAddressInput.country;
    newAddress.state = putAddressInput.state;
    newAddress.street = putAddressInput.street;
    newAddress.zip = putAddressInput.zip;
    newAddress.updatedAt = get_date_time_string();
    await this.dynamodbService.client.putItem({
      TableName,
      Item: marshall({ ...newAddress }),
    });
    return newAddress;
  }

  async findAll(userId: string, limit: number = 5) {
    const addresses = await this.dynamodbService.client.query({
      TableName,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: marshall({
        ':userId': userId,
      }),
      Limit: limit,
    });
    if (!addresses.Items) {
      return [];
    }
    return addresses.Items.map((item) => marshall(item));
  }
}
