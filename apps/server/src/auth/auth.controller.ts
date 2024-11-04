import { Controller, Get, Headers, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AccessOrGuestTokenGuard } from './access-or-guest-token.gaurd';
import { AccessTokenService } from './access-token/access-token.service';
import { AuthUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { GuestTokenService } from './guest-token/guest-token.service';
import { OptionalGuestTokenGuard } from './guest-token/optional-guest-token.gaurd';
import { RefreshTokenGuard } from './refresh-token/refresh-token.gaurd';
import { RefreshTokenService } from './refresh-token/refresh-token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly guestTokenService: GuestTokenService,
  ) {}

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.refreshTokenService.clearCookie(response);
    this.accessTokenService.clearCookie(response);
    this.guestTokenService.clearCookie(response);
    return { message: 'success' };
  }

  @Get('guest/login')
  async guestLogin(
    @AuthUser({ required: false }) payload: Auth,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.guestLogin(payload);
    this.guestTokenService.sendCookie(response, data);
    return data;
  }

  @UseGuards(OptionalGuestTokenGuard)
  @Get('google/login')
  async googleLoginWithFrontend(
    @AuthUser({ required: false }) guest: Auth,
    @Headers('Authorization') authorization: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const payload = await this.authService.googleLoginWithFrontend(
      guest,
      authorization,
    );
    this.accessTokenService.sendCookie(res, payload);
    this.refreshTokenService.sendCookie(res, payload);
    return payload;
  }

  @Get('me')
  @UseGuards(AccessOrGuestTokenGuard)
  me(@AuthUser({}) payload: Auth): Auth {
    return payload;
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
