import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseExceptionFilter } from './filters';
import { User, UserSchema } from './schemas/user.schema';

const DB_URL = process.env.DB_URL || 'mongodb://auth-mongo-srv:27017/auth';

@Module({
  imports: [
      MongooseModule.forRoot(DB_URL),
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [AppController],
  providers: [AppService, BaseExceptionFilter],
})
export class AppModule {}
