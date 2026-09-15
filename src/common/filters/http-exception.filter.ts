import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      typeof body === 'string'
        ? body
        : (body as any)?.message ??
          (exception instanceof Error ? exception.message : 'Internal server error');

    const errors =
      typeof body === 'object' && body !== null && Array.isArray((body as any).message)
        ? (body as any).message
        : undefined;

    response.status(status).json({
      statusCode: status,
      message,
      ...(errors ? { errors } : {}),
    });
  }
}
