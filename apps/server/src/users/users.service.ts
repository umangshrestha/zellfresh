import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Injectable, Logger } from '@nestjs/common';
import { Role } from 'src/auth/types/role.enum';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { get_date_time_string } from 'src/common/get-date-time';
import { PutUserInput } from './dto/put-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

const TableName = 'USERS_TABLE';

@Injectable()
export class UsersService {
  private readonly loggerService = new Logger(UsersService.name);

  constructor(private readonly dynamodbService: DynamodbService) {}

  async create(createUserInput: PutUserInput, overwrite = false) {
    const user = new User();
    user.userId = createUserInput.userId;
    user.name = createUserInput.name;
    user.email = createUserInput.email;
    user.role = Role.USER;
    user.imageUrl = createUserInput.imageUrl;
    user.blocked = false;
    user.phone = createUserInput.phone;
    user.createdAt = get_date_time_string();
    user.updatedAt = get_date_time_string();
    try {
      await this.dynamodbService.client.putItem({
        TableName,
        Item: marshall({ ...user }, { removeUndefinedValues: true }),
        ConditionExpression: overwrite
          ? undefined
          : 'attribute_not_exists(userId)',
      });
    } catch (error) {
      if (error instanceof ConditionalCheckFailedException) {
        return null;
      }
      this.loggerService.error(
        `Error creating user: ${error} for data: ${JSON.stringify(user)}`,
      );
      throw error;
    }
  }

  async findOne(userId: string) {
    try {
      const userData = await this.dynamodbService.client.getItem({
        TableName,
        Key: marshall({ userId: userId }),
      });
      if (!userData.Item) {
        return null;
      }
      return unmarshall(userData.Item) as User;
    } catch (error) {
      this.loggerService.error(`Error fetching user: ${error}`);
      throw null;
    }
  }

  async updateDetails(userId: string, putUserInput: UpdateUserInput) {
    await this.dynamodbService.client.updateItem({
      TableName,
      Key: marshall({ userId }),
      UpdateExpression: `SET #name = :name, #email = :email, #phone = :phone, #imageUrl = :imageUrl, #updatedAt = :updatedAt`,
      ExpressionAttributeNames: {
        '#name': 'name',
        '#imageUrl': 'imageUrl',
        '#email': 'email',
        '#phone': 'phone',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: marshall({
        ':name': putUserInput.name,
        ':imageUrl': putUserInput.imageUrl || '',
        ':email': putUserInput.email,
        ':phone': putUserInput.phone,
        ':updatedAt': get_date_time_string(),
      }),
    });
    return this.findOne(userId);
  }

  async updateDefaultAddress(userId: string, addressId: string) {
    await this.dynamodbService.client.updateItem({
      TableName,
      Key: marshall({ userId }),
      UpdateExpression: `SET #defaultAddressId = :defaultAddressId, #updatedAt = :updatedAt`,
      ExpressionAttributeNames: {
        '#defaultAddressId': 'defaultAddressId',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: marshall({
        ':defaultAddressId': addressId,
        ':updatedAt': get_date_time_string(),
      }),
    });
    return this.findOne(userId);
  }

  async getDefaultAddressId(userId: string) {
    const user = await this.findOne(userId);
    if (!user) {
      return null;
    }
    return user.defaultAddressId;
  }
}
