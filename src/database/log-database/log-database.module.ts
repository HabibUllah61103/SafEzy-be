import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LOG_CONNECTION } from '../database.constant';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: LOG_CONNECTION,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('db.log.host'),
        port: configService.getOrThrow<number>('db.log.port'),
        username: configService.getOrThrow<string>('db.log.username'),
        password: configService.getOrThrow<string>('db.log.password'),
        database: configService.getOrThrow<string>('db.log.database'),
        autoLoadEntities: true,
        extra: {
          max: 1,
          schema: 'public',
        },
        // uncomment the following line if you want to use SSL connection
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class LogDatabaseModule {}
