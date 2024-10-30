import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AddressesService } from '../addresses/addresses.service';
import { Address } from '../addresses/entities/address.entity';
import { AccessOrGuestTokenGuard } from '../auth/access-or-guest-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { Role } from '../auth/entities/role.enum';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressesService: AddressesService,
  ) {}

  @Query(() => User, { nullable: true })
  @UseGuards(AccessOrGuestTokenGuard)
  me(@AuthUser({ required: true }) payload: Auth) {
    if (payload.role === Role.GUEST) {
      const user = new User();
      user.userId = payload.sub;
      user.role = Role.USER;
      return user;
    }
    return this.usersService.findOne(payload.sub);
  }

  @UseGuards(AccessOrGuestTokenGuard)
  @Mutation(() => User)
  updateUser(
    @AuthUser({ required: true }) payload: Auth,
    @Args('updateUserInput') user: UpdateUserInput,
  ) {
    return this.usersService.updateDetails(payload.sub, user);
  }

  @ResolveField(() => [Address])
  address(@AuthUser() { sub }: Auth) {
    return this.addressesService.findAll(sub);
  }
}
