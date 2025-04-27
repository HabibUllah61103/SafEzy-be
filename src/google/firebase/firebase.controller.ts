import { Body, Controller } from '@nestjs/common';
import { NotificationInterface } from '../interfaces/notification.interface';
import { FirebaseService } from './firebase.service';

@Controller('google/firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  // @Post('test/notification')
  sendNotification(@Body() notification: NotificationInterface) {
    return this.firebaseService.sendNotification(notification);
  }
}
