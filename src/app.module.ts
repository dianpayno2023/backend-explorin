/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FeatureModules } from './features.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DBConfig } from './common/config';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DBConfig.config()),
    CommonModule,
    FeatureModules,
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({
              colors: { info: 'green', error: 'red', warn: 'yellow' },
            }),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
          ),
        }),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class AppModule {}
