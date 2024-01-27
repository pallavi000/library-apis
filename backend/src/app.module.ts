import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';

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
