import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessOrGuestTokenGuard } from '../auth/access-or-guest-token.gaurd';
import { AuthUser } from '../auth/auth.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { AddressesService } from './addresses.service';
import { PutAddressInput } from './dto/put-address.input';
import { Address } from './entities/address.entity';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @UseGuards(AccessOrGuestTokenGuard)
  @Query(() => [Address])
  addresses(
    @AuthUser() { sub }: Auth,
    @Args('limit', { nullable: true, defaultValue: 5 }) limit: number = 5,
  ) {
    return this.addressesService.findAll(sub, limit);
  }

  @UseGuards(AccessOrGuestTokenGuard)
  @Mutation(() => Address)
  putAddress(
    @AuthUser({ required: true }) payload: Auth,
    @Args('putAddressInput') address: PutAddressInput,
  ) {
    return this.addressesService.putAddress(payload.sub, address);
  }
}
