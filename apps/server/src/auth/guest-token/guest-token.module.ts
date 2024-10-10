import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GuestTokenGuard } from './guest-token.gaurd';
import { GuestTokenService } from './guest-token.service';
import { GuestTokenStrategy } from './guest-token.strategy';

@Module({
  providers: [GuestTokenStrategy, GuestTokenService, GuestTokenGuard],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.getOrThrow('GUEST_TOKEN_SECRET'),
        signOptions: {
          expiresIn: ConfigService.getOrThrow('GUEST_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  exports: [JwtModule, GuestTokenService, GuestTokenGuard],
})
export class GuestTokenModule {}
