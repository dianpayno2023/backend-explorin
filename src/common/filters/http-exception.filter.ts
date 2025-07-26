/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let msg: string[] = [];

    if (typeof exceptionResponse === 'string') {
      msg.push(exceptionResponse);
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse &&
      'message' in exceptionResponse
    ) {
      const message = (exceptionResponse as any).message;
      msg = Array.isArray(message) ? message : [message];
    } else {
      msg.push('Unexpected error occurred');
    }

    response.status(code).json({
      code,
      msg,
      data : null
    });
  }
}
