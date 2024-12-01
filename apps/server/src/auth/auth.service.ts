import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CartsService } from '../carts/carts.service';
import { OrdersService } from '../orders/orders.service';
import { PutUserInput } from '../users/dto/put-user.input';
import { UsersService } from '../users/users.service';
import { Auth } from './entities/auth.entity';
import { GoogleService } from './google/google.service';
import { GuestTokenService } from './guest-token/guest-token.service';
import { Role } from './types/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly guestTokenService: GuestTokenService,
    private readonly googleStrategy: GoogleService,
    private readonly cartsService: CartsService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

  async guestLogin(payload: Auth) {
    if (payload) {
      return payload;
    }
    const data = this.guestTokenService.generateGuestDetails();
    await this.cartsService.createEmptyCart(data.sub, { overwrite: false });
    return data;
  }

  async googleLoginWithFrontend(guest: Auth, authorization: string) {
    const {
      sub,
      picture: imageUrl,
      email,
      name,
    } = await this.googleStrategy.validate(authorization);
    const user = await this.usersService.findOne(sub);
    if (user?.blocked) {
      throw new UnauthorizedException('User is blocked');
    }
    const payload: Auth = user
      ? {
          sub,
          email: user.email,
          name: user.name,
          imageUrl: user.imageUrl,
          role: user.role,
        }
      : {
          sub,
          email,
          name,
          imageUrl,
          role: Role.USER,
        };
    if (!user) {
      const newUser = new PutUserInput();
      newUser.userId = sub;
      newUser.email = email;
      newUser.name = name;
      newUser.imageUrl = imageUrl;
      await this.usersService.create(newUser);
    }
    if (guest && guest.sub && guest.sub.startsWith('guest-')) {
      await this.cartsService.moveCartItemsFromGuestToUser(guest.sub, sub);
      await this.ordersService.moveOrdersFromGuestToUser(guest.sub, sub);
    } else {
      await this.cartsService.createEmptyCart(sub, { overwrite: false });
    }
    return payload;
  }
}
