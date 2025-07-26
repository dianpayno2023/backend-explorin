import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const code = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'string') {
          return {
            code,
            msg: [data],
            data: null,
          };
        }

        if (
          typeof data === 'object' &&
          data !== null &&
          'data' in data &&
          'total' in data &&
          'page' in data &&
          'limit' in data &&
          'totalPage' in data
        ) {
          return {
            code,
            msg: [],
            ...data,
          };
        }

        if (typeof data === 'object') {
          return {
            code,
            msg: [],
            data,
          };
        }

        return {
          code,
          msg: [],
          data,
        };
      }),
    );
  }
}
