import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenStrategy } from './refresh-token.strategy';

@Module({
  providers: [RefreshTokenStrategy, RefreshTokenService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.getOrThrow('REFRESH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: ConfigService.getOrThrow('REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
