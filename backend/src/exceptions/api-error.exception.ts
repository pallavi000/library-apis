import { HttpException } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(error: any) {
    const message = error.message || 'Internal Server Error';
    error.message = message;
    const status = error.status || 500;
    super(error, status);
  }
}
