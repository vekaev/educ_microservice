import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_URL: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
