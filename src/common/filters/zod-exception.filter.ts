/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const isZodError =
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'formErrors' in exceptionResponse &&
      'fieldErrors' in exceptionResponse;

    if (isZodError) {
      const fieldErrors = exceptionResponse.fieldErrors;
      const firstField = Object.keys(fieldErrors)[0];
      const firstMessage = fieldErrors[firstField][0];

      response.status(status).json({
        code: status,
        message: firstMessage || 'Validation error',
      });
    } else {
      response.status(status).json({
        code: status,
        message: (exceptionResponse?.message as string) || 'Bad Request',
      });
    }
  }
}
