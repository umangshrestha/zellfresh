import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AccessTokenService {
  constructor(private jwtService: JwtService) {}

  getToken(data: Auth) {
    return { accessToken: this.jwtService.sign(data) };
  }
}
