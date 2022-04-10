import { Module } from '@nestjs/common';

import { AuthModule, ConfigModule, DbModule } from './modules';
import { BaseExceptionFilter } from './filters';

@Module({
  imports: [AuthModule, ConfigModule, DbModule],
  providers: [BaseExceptionFilter],
})
export class AppModule {}
