import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class RefreshTokenService {
  cookieName: string;
  cookieOptions: CookieOptions;
  clearCookieOptions: CookieOptions;

  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.cookieName = configService.getOrThrow('REFRESH_TOKEN_COOKIE_NAME');
    const httpOnly = configService.getOrThrow('COOKIE_HTTP_ONLY');
    const domain = configService.getOrThrow('COOKIE_DOMAIN');
    const maxAge = configService.getOrThrow('REFRESH_TOKEN_EXPIRATION_TIME');
    this.clearCookieOptions = {
      httpOnly,
      path: '/',
      domain,
    };
    this.cookieOptions = {
      ...this.clearCookieOptions,
      maxAge,
    };
  }

  sendCookie(res: Response, data: Auth) {
    const token = this.jwtService.sign(data);
    res.cookie(this.cookieName, token, this.cookieOptions);
  }

  clearCookie(res: Response) {
    res.clearCookie(this.cookieName, this.clearCookieOptions);
  }
}
