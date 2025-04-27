import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { LoggerService } from 'src/modules/logger/logger.service';
import { TestNotificationDto } from 'src/modules/notifications/dtos/create-notification.dto';
import { NotificationInterface } from '../interfaces/notification.interface';

@Injectable()
export class FirebaseService {
  constructor(private readonly logger: LoggerService) {}

  async sendNotification(notification: NotificationInterface) {
    try {
      const { data, body, fcmTokens } = notification;

      if (!fcmTokens?.length) return;

      const message = {
        data,
        notification: {
          title: 'Job Update',
          body: body,
        },
        tokens: fcmTokens,
      };

      return admin.messaging().sendEachForMulticast(message);
    } catch (error) {
      this.logger.error(
        `Error in FirebaseService#sendNotification ${JSON.stringify({ error, notification })}`,
        error?.stack,
      );
    }
  }

  async sendTestNotification(dto: TestNotificationDto) {
    try {
      const { title, body, fcm_token } = dto;

      const message = {
        notification: {
          title: title,
          body: body,
        },
        token: fcm_token,
      };

      return admin.messaging().send(message);
    } catch (error) {
      this.logger.error(
        `Error in FirebaseService#sendNotification ${JSON.stringify({ error, dto })}`,
        error?.stack,
      );
    }
  }
}
