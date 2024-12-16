import { Test, TestingModule } from '@nestjs/testing';
import { FilterLimitArgs } from 'src/common/dto/filter-limit.args';
import { AddressesService } from '../addresses/addresses.service';
import { Address } from '../addresses/entities/address.entity';
import { Auth } from '../auth/entities/auth.entity';
import { Role } from '../auth/types/role.enum';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;
  let addressesService: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            updateDetails: jest.fn(),
          },
        },
        {
          provide: AddressesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
    addressesService = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('me', () => {
    it('should return the user if found', async () => {
      const user = new User();
      user.userId = '1';
      user.role = Role.USER;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

      const result = await resolver.me({ sub: '1', role: Role.USER } as Auth);

      expect(result).toEqual(user);
    });

    it('should return a new user if not found and role is GUEST', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      const result = await resolver.me({ sub: '1', role: Role.GUEST } as Auth);

      expect(result).toEqual(
        expect.objectContaining({ userId: '1', role: Role.USER }),
      );
    });

    it('should return null if not found and role is not GUEST', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      const result = await resolver.me({ sub: '1', role: Role.USER } as Auth);

      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update user details', async () => {
      const updateUserInput: UpdateUserInput = {
        name: 'Updated User',
        email: 'updated@example.com',
        imageUrl: 'http://example.com/updated-image.png',
        phone: '0987654321',
      };
      const user = new User();
      user.userId = '1';
      jest.spyOn(usersService, 'updateDetails').mockResolvedValue(user);

      const result = await resolver.updateUser(
        { sub: '1' } as Auth,
        updateUserInput,
      );

      expect(result).toEqual(user);
      expect(usersService.updateDetails).toHaveBeenCalledWith(
        '1',
        updateUserInput,
      );
    });
  });

  describe('address', () => {
    it('should return all addresses for the user', async () => {
      const addresses: Address[] = [];
      jest.spyOn(addressesService, 'findAll').mockResolvedValue(addresses);

      const result = await resolver.address(
        { sub: '1' } as Auth,
        { limit: 10 } as FilterLimitArgs,
      );

      expect(result).toEqual(addresses);
      expect(addressesService.findAll).toHaveBeenCalledWith('1', { limit: 10 });
    });
  });

  describe('defaultAddress', () => {
    it('should return the default address if found', async () => {
      const address = new Address();
      jest.spyOn(addressesService, 'findOne').mockResolvedValue(address);

      const result = await resolver.defaultAddress(
        { sub: '1' } as Auth,
        { defaultAddressId: 'address-1' } as User,
      );

      expect(result).toEqual(address);
      expect(addressesService.findOne).toHaveBeenCalledWith('1', 'address-1');
    });

    it('should return null if default address ID is not provided', async () => {
      const result = await resolver.defaultAddress(
        { sub: '1' } as Auth,
        { defaultAddressId: null } as User,
      );

      expect(result).toBeNull();
    });
  });
});
