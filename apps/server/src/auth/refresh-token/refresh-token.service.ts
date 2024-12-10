import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(data: Auth) {
    return { refreshToken: this.jwtService.sign(data) };
  }
}
