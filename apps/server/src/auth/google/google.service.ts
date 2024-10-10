import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private client: OAuth2Client;
  constructor(private readonly configService: ConfigService) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async validate(idToken: string): Promise<TokenPayload> {
    const token = idToken.replace('Bearer ', '');
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return payload;
  }
}
