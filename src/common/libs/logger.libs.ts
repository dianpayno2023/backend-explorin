import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    // Simpan original method
    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
      const duration = Date.now() - start;
      const { method, originalUrl } = req;

      // Ambil nilai 'code' dari response body
      const code = body?.code ?? res.statusCode;
      const message = `${method} ${originalUrl} ${code} ${ body.msg.length> 0 ? " - " + body?.msg?.join(', ') : ''}`;

      if (code >= 500) {
        this.logger.error(message);
      } else if (code >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.info(message);
      }

      return originalJson(body);
    };

    next();
  }
}
