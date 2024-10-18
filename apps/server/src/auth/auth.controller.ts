import { Controller, Get, Headers, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CartsService } from 'src/carts/carts.service';
import { AccessOrGuestTokenGuard } from './access-or-guest-token.gaurd';
import { AccessTokenService } from './access-token/access-token.service';
import { AuthUser } from './auth.decorator';
import { Auth } from './entities/auth.entity';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';
import { GoogleService } from './google/google.service';
import { GuestTokenService } from './guest-token/guest-token.service';
import { RefreshTokenGuard } from './refresh-token/refresh-token.gaurd';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly guestTokenService: GuestTokenService,
    private readonly googleStrategy: GoogleService,
    private readonly cartsService: CartsService,
  ) {}

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.refreshTokenService.clearCookie(response);
    this.accessTokenService.clearCookie(response);
    this.guestTokenService.clearCookie(response);
    return { message: 'success' };
  }

  @Get('guest/login')
  guestLogin(
    @AuthUser({ required: false }) payload: Auth,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (payload) {
      return payload;
    }
    const data = this.guestTokenService.generateGuestDetails();
    this.cartsService.createEmptyCart(data.sub);
    this.guestTokenService.sendCookie(response, data);
    return data;
  }

  @Get('google/login')
  async googleLoginWithFrontend(
    @AuthUser({ required: false }) guest: Auth,
    @Headers('Authorization') authorization: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const {
      sub,
      picture: imageUrl,
      email,
      name,
    } = await this.googleStrategy.validate(authorization);
    const payload = {
      sub,
      email,
      name,
      imageUrl,
      role: Role.USER,
    };
    if (guest && guest.sub && guest.sub.startsWith('guest-')) {
      this.cartsService.moveCartItemsFromGuestToUser(guest.sub, sub);
    } else {
      this.cartsService.createEmptyCart(sub);
    }
    this.accessTokenService.sendCookie(res, payload);
    this.refreshTokenService.sendCookie(res, payload);
    return payload;
  }

  @Get('me')
  @UseGuards(AccessOrGuestTokenGuard)
  me(@AuthUser({}) payload: Auth): User {
    return {
      name: payload.name,
      email: payload.email,
      role: payload.role,
      imageUrl: payload.imageUrl,
    };
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(
    @AuthUser() payload: Auth,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.accessTokenService.sendCookie(response, payload);
    this.refreshTokenService.sendCookie(response, payload);
    return { message: 'success' };
  }
}
