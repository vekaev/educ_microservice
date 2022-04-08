import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { exceptionFactory } from './utils';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory }))

  await app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0');
})();
