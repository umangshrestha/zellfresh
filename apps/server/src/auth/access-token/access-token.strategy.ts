import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const cookieName = configService.getOrThrow('ACCESS_TOKEN_COOKIE_NAME');
    const secretOrKey = configService.getOrThrow('ACCESS_TOKEN_SECRET');
    const jwtFromRequest = ExtractJwt.fromExtractors([
      (request: Request) => request?.cookies?.[cookieName] || null,
    ]);

    super({ jwtFromRequest, secretOrKey });
  }

  validate(payload: Auth) {
    return payload;
  }
}
