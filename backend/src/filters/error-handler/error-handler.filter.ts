import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception.message);
    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    const { message }: any = exception.getResponse();

    return res.status(status).json({
      statusCode: status,
      path: req.url,
      message: message,
    });
  }
}
