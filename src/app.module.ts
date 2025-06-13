import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggerModule } from './modules/logger/logger.module';
import { getEnvironmentFilePath } from './utils/getEnvironmentFilePath';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { DatabaseModule } from './database';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { configValidationSchema, configVariables } from './config';
import { UserModule } from './modules/user/user.module';
import { RoleGuard } from './shared/guards/role.guard';
import { JwtUserStrategy } from './modules/iam/auth/strategies/jwt-user.strategy';
import { IamModule } from './modules/iam/iam.module';
import { JwtAdminStrategy } from './modules/iam/auth/strategies/jwt-admin.strategy';
import { MailModule } from './mail/mail.module';
import { HttpLoggerMiddleware } from './shared/middlewares';
import { LogModule } from './log/log.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { UploadModule } from './modules/upload/upload.module';
import { DeviceModule } from './modules/device/device.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvironmentFilePath(),
      validationSchema: configValidationSchema,
      load: [configVariables],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(process.cwd(), 'src/messages/i18n/'),
        watch: true,
      },
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang'],
        },
        AcceptLanguageResolver,
      ],
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    LoggerModule,
    LogModule,
    UserModule,
    IamModule,
    MailModule,
    VehicleModule,
    NotificationsModule,
    UploadModule,
    DeviceModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    JwtUserStrategy,
    JwtAdminStrategy,
    RoleGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
