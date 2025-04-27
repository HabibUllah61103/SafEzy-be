import { NotificationType } from 'src/modules/notifications/enums/notification-type.enum';

export interface NotificationInterface {
  fcmTokens: string[];
  type: NotificationType;
  body: string;
  data: any;
}
