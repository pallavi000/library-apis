import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './utils/constant';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';
import { AdminLogginsInterceptor } from './interceptors/admin-loggins/admin-loggins.interceptor';
import { ErrorHandlerFilter } from './filters/error-handler/error-handler.filter';

// middleware -> guard -> interceptors -> pipes -> controller -> filters

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandlerFilter());

  // app.useGlobalInterceptors(new AdminLogginsInterceptor());

  app.use(cookieParser());
  config();
  await app.listen(PORT);
}
bootstrap();
