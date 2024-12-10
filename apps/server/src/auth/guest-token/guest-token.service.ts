import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../entities/auth.entity';
import { Role } from '../types/role.enum';

@Injectable()
export class GuestTokenService {
  private readonly logger = new Logger(GuestTokenService.name);

  constructor(private jwtService: JwtService) {}

  generateGuestDetails(): Auth {
    const sub = uuidv4();
    return {
      sub: `guest-${sub}`,
      role: Role.GUEST,
      email: `${sub}@guest.pw`,
      name: 'Guest User',
      imageUrl: '',
    };
  }

  getToken(data: Auth) {
    return { guestToken: this.jwtService.sign(data) };
  }

  decrypt(token?: string): Auth {
    if (!token) {
      return null;
    }
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
