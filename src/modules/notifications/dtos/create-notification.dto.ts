import { IsString } from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';

export class CreateNotificationDto {
  receiverId: number;
  senderId?: number;
  type: NotificationType;
  resourceId?: number;
}

export class TestNotificationDto {
  @IsString()
  title: string;
  @IsString()
  body: string;
  @IsString()
  fcm_token: string;
}
