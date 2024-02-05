import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { LoggingMiddleware } from './middlewares/logging/logging.middleware';
import { V1Module } from './modules/v1/v1.module';

@Module({
  imports: [V1Module],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
