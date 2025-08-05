/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters';
import { ResponseInterceptor } from './common/interceptors';
import { AppDataSource } from './data-source';
import { DBConfig } from './common/config';
dotenv.config();

async function bootstrap() {
  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected!');

      console.log(process.env.DB_HOST, process.env.DB_PORT);
    })
    .catch((error) => {
      console.error('Database koneksinya error:', error);
      console.log(process.env.DB_HOST, process.env.DB_PORT);
    });

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  app.setGlobalPrefix(process.env.APP_PREFIX ?? 'api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
