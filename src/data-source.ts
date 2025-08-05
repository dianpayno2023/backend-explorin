/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { parseBoolean } from './common/utils';
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: parseBoolean(process.env.DB_SYNC) ?? false,
  logging: parseBoolean(process.env.DB_LOGGING) ?? false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ['dist/migrations/*.js'],
});
