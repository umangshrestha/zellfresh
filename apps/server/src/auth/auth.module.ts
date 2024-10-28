import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CartsModule } from 'src/carts/carts.module';
import { UsersModule } from '../users/users.module';
import { AccessOrGuestTokenGuard } from './access-or-guest-token.gaurd';
import { AccessTokenModule } from './access-token/access-token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleService } from './google/google.service';
import { GuestTokenModule } from './guest-token/guest-token.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [
    AccessTokenModule,
    RefreshTokenModule,
    GuestTokenModule,
    CartsModule,
    UsersModule,
    ConfigModule,
    PassportModule.register({
      session: true,
      defaultStrategy: 'jwt',
      property: 'user',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GoogleService, AccessOrGuestTokenGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
