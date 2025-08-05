import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENTITIES } from 'src/models';

export class DBConfig {
  static config(): TypeOrmModuleOptions {
    console.log('Connecting to DB:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      db: process.env.DB_NAME,
    });
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ENTITIES,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}
