import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './entities/notification.entity';
import { NotificationRepository } from './repositories/notification.repository';
import { GoogleModule } from 'src/google/google.module';
import { UserModule } from '../user/user.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { PRIMARY_CONNECTION } from 'src/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification], PRIMARY_CONNECTION),
    VehicleModule,
    GoogleModule,
    UserModule,
  ],
  providers: [NotificationsService, NotificationRepository],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
