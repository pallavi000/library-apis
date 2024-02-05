import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

//module
import { AppModule } from './app.module';

// interceptor
import { AdminLogginsInterceptor } from './interceptors/admin-loggins/admin-loggins.interceptor';

//error handler
import { ErrorHandlerFilter } from './filters/error-handler/error-handler.filter';

//constant
import { PORT } from './utils/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandlerFilter());
  app.useGlobalInterceptors(new AdminLogginsInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Library Api')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/v1/docs', app, swaggerDocument);

  app.use(cookieParser());
  config();
  await app.listen(PORT);
}
bootstrap();
