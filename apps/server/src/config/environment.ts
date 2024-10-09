import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsEnum(['development', 'production', 'test'])
  NODE_ENV: 'development' | 'production' | 'test' = 'development';

  @IsNumber()
  PORT: number = 3000;

  @IsString()
  AWS_REGION: string = 'us-east-1';

  @IsString()
  AWS_ACCESS_KEY_ID: string = 'test';

  @IsString()
  AWS_SECRET_ACCESS_KEY: string = 'test';

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  ACCESS_TOKEN_SECRET: string = 'secret';

  @IsString()
  @IsNotEmpty()
  ACCESS_TOKEN_COOKIE_NAME: string = 'access_token';

  @IsNumber()
  @IsNotEmpty()
  ACCESS_TOKEN_EXPIRATION_TIME: number = 3600;

  @IsString()
  @IsNotEmpty()
  REFRESH_TOKEN_SECRET: string = 'refresh_secret';

  @IsString()
  @IsNotEmpty()
  REFRESH_TOKEN_COOKIE_NAME: string = 'refresh_token';

  @IsNumber()
  @IsNotEmpty()
  REFRESH_TOKEN_EXPIRATION_TIME: number = 3600;

  @IsString()
  @IsNotEmpty()
  COOKIE_DOMAIN: string = 'localhost';

  @IsBoolean()
  @IsNotEmpty()
  COOKIE_HTTP_ONLY: boolean = true;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
