import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from '../auth/access-or-guest-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { Role } from '../auth/entities/role.enum';
import { PutAddressInput } from './dto/put-address.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
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
  putAddress(
    @AuthUser({ required: true }) payload: Auth,
    @Args('putAddressInput') address: PutAddressInput,
  ) {
    return this.usersService.addAddress(payload.sub, address);
  }

  @UseGuards(AccessOrGuestTokenGuard)
  @Mutation(() => User)
  updateUser(
    @AuthUser({ required: true }) payload: Auth,
    @Args('updateUserInput') user: UpdateUserInput,
  ) {
    return this.usersService.updateDetails(payload.sub, user);
  }
}
