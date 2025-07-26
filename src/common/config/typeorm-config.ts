import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENTITIES } from 'src/models';

export class DBConfig {
  static config() : TypeOrmModuleOptions{
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
