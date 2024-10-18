import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('PORT');

  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  app.use(compression());
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
