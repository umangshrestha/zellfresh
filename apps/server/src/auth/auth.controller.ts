import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AccessTokenService } from './access-token/access-token.service';
import { AuthUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { GuestTokenGuard } from './guest-token/guest-token.gaurd';
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

  @Get('guest/login')
  async guestLogin(@Headers('x-guest-token') guestToken?: string) {
    const payload = this.guestTokenService.decrypt(guestToken);
    const data = await this.authService.guestLogin(payload);
    return this.guestTokenService.getToken(data);
  }

  @UseGuards(OptionalGuestTokenGuard)
  @Get('google/login')
  async googleLoginWithFrontend(
    @Headers('Authorization') authorization: string,
    @Headers('x-guest-token') guestToken?: string,
  ) {
    const guest = this.guestTokenService.decrypt(guestToken);
    const payload = await this.authService.googleLoginWithFrontend(
      guest,
      authorization,
    );
    return {
      ...this.accessTokenService.getToken(payload),
      ...this.refreshTokenService.getToken(payload),
    };
  }

  @Get('me')
  @UseGuards(GuestTokenGuard)
  me(@AuthUser({}) payload: Auth): Auth {
    return payload;
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@AuthUser() payload: Auth) {
    return {
      ...this.accessTokenService.getToken(payload),
      ...this.refreshTokenService.getToken(payload),
    };
  }
}
