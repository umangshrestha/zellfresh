import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GuestTokenService } from './guest-token.service';
import { GuestTokenStrategy } from './guest-token.strategy';

@Module({
  providers: [GuestTokenStrategy, GuestTokenService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.getOrThrow('Guest_TOKEN_SECRET'),
        signOptions: {
          expiresIn: ConfigService.getOrThrow('Guest_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  exports: [JwtModule, GuestTokenService],
})
export class GuestTokenModule {}
