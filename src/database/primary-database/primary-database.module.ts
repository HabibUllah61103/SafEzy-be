import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PRIMARY_CONNECTION } from '../database.constant';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: PRIMARY_CONNECTION,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('db.primary.host'),
        port: configService.getOrThrow<number>('db.primary.port'),
        username: configService.getOrThrow<string>('db.primary.username'),
        password: configService.getOrThrow<string>('db.primary.password'),
        database: configService.getOrThrow<string>('db.primary.database'),
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
export class PrimaryDatabaseModule {}
