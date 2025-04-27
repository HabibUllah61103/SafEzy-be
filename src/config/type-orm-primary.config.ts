import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_PRIMARY_HOST'),
  port: configService.getOrThrow('POSTGRES_PRIMARY_PORT'),
  username: configService.getOrThrow('POSTGRES_PRIMARY_USER'),
  password: configService.getOrThrow('POSTGRES_PRIMARY_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_PRIMARY_DB'),
  migrations: ['./src/database/migrations/primary/**'],
  entities: ['dist/modules/**/*.entity.js'],
  // uncomment the following line if you want to use SSL connection
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
