import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_LOG_HOST'),
  port: configService.getOrThrow('POSTGRES_LOG_PORT'),
  username: configService.getOrThrow('POSTGRES_LOG_USER'),
  password: configService.getOrThrow('POSTGRES_LOG_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_LOG_DB'),
  migrations: ['./database/migrations/log/**'],
  entities: ['dist/log/**/*.entity.js'],
  // uncomment the following line if you want to use SSL connection
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
