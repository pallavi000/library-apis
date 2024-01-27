import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();
    const status = exception.getStatus();

    return res.status(status).json({
      statusCode: status,
      path: req.url,
      message: 'error',
    });
  }
}
