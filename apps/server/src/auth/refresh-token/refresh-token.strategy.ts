import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    const secretOrKey = configService.getOrThrow('REFRESH_TOKEN_SECRET');
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    super({ jwtFromRequest, secretOrKey });
  }

  validate(payload: Auth) {
    return payload;
  }
}
