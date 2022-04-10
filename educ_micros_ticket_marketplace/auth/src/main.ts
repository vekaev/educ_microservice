import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'cookie-session';
import * as passport from 'passport';

import { AppModule } from './app.module';
import { exceptionFactory } from './utils';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/api');
  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe({ exceptionFactory, transform: true }));

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      cookie: { signed: false, secure: true },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(configService.get('PORT'));
})();
