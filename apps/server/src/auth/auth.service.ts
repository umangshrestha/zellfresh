import { Injectable } from '@nestjs/common';
import { CartsService } from '../carts/carts.service';
import { PutUserInput } from '../users/dto/put-user.input';
import { UsersService } from '../users/users.service';
import { Auth } from './entities/auth.entity';
import { Role } from './entities/role.enum';
import { GoogleService } from './google/google.service';
import { GuestTokenService } from './guest-token/guest-token.service';
import { OrdersService } from '../orders/orders.service';

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
    await this.cartsService.createEmptyCart(data.sub);
    return data;
  }

  async googleLoginWithFrontend(guest: Auth, authorization: string) {
    const {
      sub,
      picture: imageUrl,
      email,
      name,
    } = await this.googleStrategy.validate(authorization);
    const payload: Auth = {
      sub,
      email,
      name,
      imageUrl,
      role: Role.USER,
    };
    const newUser = new PutUserInput();
    newUser.userId = sub;
    newUser.email = email;
    newUser.name = name;
    newUser.imageUrl = imageUrl;
    await this.usersService.create(newUser);
    if (guest && guest.sub && guest.sub.startsWith('guest-')) {
      await this.cartsService.moveCartItemsFromGuestToUser(guest.sub, sub);
      await this.ordersService.moveOrdersFromGuestToUser(guest.sub, sub);
    } else {
      await this.cartsService.createEmptyCart(sub, false);
    }
    return payload;
  }
}
