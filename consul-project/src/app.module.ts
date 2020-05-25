import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OpenAPIController } from './openapi.controller';

@Module({
  imports: [],
  controllers: [AppController, OpenAPIController]
})
export class AppModule {}
