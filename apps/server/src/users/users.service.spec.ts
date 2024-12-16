import { marshall } from '@aws-sdk/util-dynamodb';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from 'src/auth/types/role.enum';
import { DynamodbService } from 'src/common/dynamodb/dynamodb.service';
import { get_date_time_string } from 'src/common/get-date-time';
import { PutUserInput } from './dto/put-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

jest.mock('src/common/get-date-time', () => ({
  get_date_time_string: jest.fn(() => 'mocked_date_time'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let dynamodbService: DynamodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DynamodbService,
          useValue: {
            client: {
              putItem: jest.fn(),
              getItem: jest.fn(),
              updateItem: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    dynamodbService = module.get<DynamodbService>(DynamodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserInput: PutUserInput = {
      userId: '1',
      name: 'Test User',
      email: 'test@example.com',
      imageUrl: 'http://example.com/image.png',
      phone: '1234567890',
      blocked: false,
    };

    const user = new User();
    user.userId = createUserInput.userId;
    user.name = createUserInput.name;
    user.email = createUserInput.email;
    user.role = Role.USER;
    user.imageUrl = createUserInput.imageUrl;
    user.blocked = false;
    user.phone = createUserInput.phone;
    user.createdAt = 'mocked_date_time';
    user.updatedAt = 'mocked_date_time';

    jest
      .spyOn(dynamodbService.client, 'putItem')
      .mockResolvedValue({} as never);

    await service.create(createUserInput);

    expect(dynamodbService.client.putItem).toHaveBeenCalledWith({
      TableName: 'USERS_TABLE',
      Item: marshall({ ...user }, { removeUndefinedValues: true }),
      ConditionExpression: 'attribute_not_exists(userId)',
    });
  });

  it('should find a user by ID', async () => {
    const userId = '1';
    const user = new User();
    user.userId = userId;
    user.name = 'Test User';
    user.email = 'test@example.com';
    user.role = Role.USER;
    user.imageUrl = 'http://example.com/image.png';
    user.blocked = false;
    user.phone = '1234567890';
    user.createdAt = get_date_time_string();
    user.updatedAt = get_date_time_string();

    jest.spyOn(dynamodbService.client, 'getItem').mockResolvedValue({
      Item: marshall(user, { convertClassInstanceToMap: true }),
    } as never);

    const result = await service.findOne(userId);

    expect(result).toEqual(user);
    expect(dynamodbService.client.getItem).toHaveBeenCalledWith({
      TableName: 'USERS_TABLE',
      Key: marshall({ userId }),
    });
  });

  it('should update user details', async () => {
    const userId = '1';
    const updateUserInput: UpdateUserInput = {
      name: 'Updated User',
      email: 'updated@example.com',
      imageUrl: 'http://example.com/updated-image.png',
      phone: '0987654321',
    };

    jest
      .spyOn(dynamodbService.client, 'updateItem')
      .mockResolvedValue({} as never);
    jest.spyOn(service, 'findOne').mockResolvedValue(new User());

    await expect(
      service.updateDetails(userId, updateUserInput),
    ).resolves.not.toThrow();

    expect(dynamodbService.client.updateItem).toHaveBeenCalledWith({
      TableName: 'USERS_TABLE',
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
        ':name': updateUserInput.name,
        ':imageUrl': updateUserInput.imageUrl || '',
        ':email': updateUserInput.email,
        ':phone': updateUserInput.phone,
        ':updatedAt': get_date_time_string(),
      }),
    });
  });

  it('should update default address', async () => {
    const userId = '1';
    const addressId = 'address-1';

    jest
      .spyOn(dynamodbService.client, 'updateItem')
      .mockResolvedValue({} as never);
    jest.spyOn(service, 'findOne').mockResolvedValue(new User());

    await expect(
      service.updateDefaultAddress(userId, addressId),
    ).resolves.not.toThrow();

    expect(dynamodbService.client.updateItem).toHaveBeenCalledWith({
      TableName: 'USERS_TABLE',
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
  });

  it('should get default address ID', async () => {
    const userId = '1';
    const user = new User();
    user.userId = userId;
    user.name = 'Test User';
    user.email = 'test@example.com';
    user.role = Role.USER;
    user.imageUrl = 'http://example.com/image.png';
    user.blocked = false;
    user.phone = '1234567890';
    user.createdAt = get_date_time_string();
    user.updatedAt = get_date_time_string();
    user.defaultAddressId = 'address-1';

    jest.spyOn(service, 'findOne').mockResolvedValue(user);

    const result = await service.getDefaultAddressId(userId);

    expect(result).toEqual('address-1');
    expect(service.findOne).toHaveBeenCalledWith(userId);
  });
});
