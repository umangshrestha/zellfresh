import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as process from 'node:process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [process.env.NODE_ENV === 'production' ? 'error' : 'debug'],
  });
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('PORT');
  app.setGlobalPrefix('/api');
  app.use(compression());
  await app.listen(PORT, '0.0.0.0');
}

bootstrap()
  .then(() => {
    console.log('Server started');
  })
  .catch((err) => {
    console.error(err);
  });
