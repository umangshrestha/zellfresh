import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Headers,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { GoogleService } from './google/google.service';
import { RefreshTokenGuard } from './refresh-token/refresh-token.gaurd';
import { AccessTokenService } from './access-token/access-token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { AuthUser } from './auth.decorator';
import { Response } from 'express';
import { Auth } from './entities/auth.entity';
import { Role } from './entities/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly googleStrategy: GoogleService,
  ) {}

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    this.refreshTokenService.clearCookie(response);
    this.accessTokenService.clearCookie(response);
    return { message: 'Logout successfully' };
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
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @AuthUser() payload: Auth,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.accessTokenService.sendCookie(response, payload);
    return payload;
  }
}
