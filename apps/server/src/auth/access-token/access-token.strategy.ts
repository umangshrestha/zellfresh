import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const secretOrKey = configService.getOrThrow('ACCESS_TOKEN_SECRET');
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    super({ jwtFromRequest, secretOrKey });
  }

  validate(payload: Auth) {
    return payload;
  }
}
