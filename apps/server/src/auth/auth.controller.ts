import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AccessTokenGuard } from './access-token/access-token.gaurd';
import { AccessTokenService } from './access-token/access-token.service';
import { AuthUser } from './auth.decorator';
import { Auth } from './entities/auth.entity';
import { Role } from './entities/role.enum';
import { GoogleService } from './google/google.service';
import { GuestTokenGuard } from './guest-token/guest-token.gaurd';
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
  ) {}

  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.refreshTokenService.clearCookie(response);
    this.accessTokenService.clearCookie(response);
    this.guestTokenService.clearCookie(response);
    return { message: 'success' };
  }

  @Get('guest/login')
  async guestLogin(
    @AuthUser() payload: Auth,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (payload) {
      return payload;
    }
    const data = this.guestTokenService.generateGuestDetails();
    this.guestTokenService.sendCookie(response, data);
    return data;
  }

  @Get('google/login')
  async googleLoginWithFrontend(
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
    this.accessTokenService.sendCookie(res, payload);
    this.refreshTokenService.sendCookie(res, payload);
    return payload;
  }

  @Get('me')
  @UseGuards(AccessTokenGuard, GuestTokenGuard)
  async me(@AuthUser() payload: Auth) {
    return payload;
  }

  @Get('refresh')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @AuthUser() payload: Auth,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.accessTokenService.sendCookie(response, payload);
    this.refreshTokenService.sendCookie(response, payload);
    return { message: 'success' };
  }
}
