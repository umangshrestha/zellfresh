import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FilterLimitArgs } from 'src/common/dto/filter-limit.args';
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
  addresses(@AuthUser() { sub }: Auth, @Args() filter: FilterLimitArgs) {
    return this.addressesService.findAll(sub, filter);
  }

  @UseGuards(AccessOrGuestTokenGuard)
  @Mutation(() => Address)
  putAddress(
    @AuthUser({ required: true }) payload: Auth,
    @Args('putAddressInput') putAddressInput: PutAddressInput,
  ) {
    return this.addressesService.putAddress(payload.sub, putAddressInput);
  }

  @UseGuards(AccessOrGuestTokenGuard)
  @Query(() => Address)
  address(
    @AuthUser({ required: true }) payload: Auth,
    @Args('addressId') addressId: string,
  ) {
    return this.addressesService.findOne(payload.sub, addressId);
  }

  @UseGuards(AccessOrGuestTokenGuard)
  @Mutation(() => Address)
  deleteAddress(
    @AuthUser({ required: true }) payload: Auth,
    @Args('addressId') addressId: string,
  ) {
    return this.addressesService.delete(payload.sub, addressId);
  }

  @UseGuards(AccessOrGuestTokenGuard)
  @Mutation(() => Address)
  setDefaultAddress(
    @AuthUser({ required: true }) payload: Auth,
    @Args('addressId') addressId: string,
  ) {
    return this.addressesService.updateDefaultAddress(payload.sub, addressId);
  }
}
